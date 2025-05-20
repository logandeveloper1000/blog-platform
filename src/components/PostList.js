// src/components/PostList.js
import React, { useEffect, useState, useContext, useCallback } from "react";
import { db } from "../firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  orderBy,
  updateDoc,
} from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import Modal from "./Modal";
import Loading from "./Loading";

function PostList({ onlyUserPosts = false, overridePosts = null, setOverridePosts }) {
  const [posts, setPosts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editPublic, setEditPublic] = useState(true);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user, setModal } = useContext(AuthContext);

  const setFinalPosts = useCallback((data) => {
  setPosts(data);
  if (setOverridePosts) setOverridePosts(data);
}, [setOverridePosts]);

  const fetchPosts = useCallback(async () => {
  if (onlyUserPosts && !user) return;

  setLoading(true);
  try {
    let q;

    if (onlyUserPosts && user) {
      q = query(
        collection(db, "posts"),
        where("authorId", "==", user.uid),
        orderBy("createdAt", "desc")
      );
    } else {
      q = query(
        collection(db, "posts"),
        where("public", "==", true),
        where("approved", "==", true),
        orderBy("createdAt", "desc")
      );
    }

    const snapshot = await getDocs(q);
    const fetchedPosts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    setFinalPosts(fetchedPosts);
  } catch (err) {
    setModal({
      type: "error",
      title: "Error Loading Posts",
      message: err.message,
    });
  }
  setLoading(false);
}, [onlyUserPosts, user, setModal, setFinalPosts]);


  const startEdit = (post) => {
    setEditingId(post.id);
    setEditTitle(post.title);
    setEditContent(post.content);
    setEditPublic(post.public);
  };

  const saveEdit = async () => {
    try {
      await updateDoc(doc(db, "posts", editingId), {
        title: editTitle,
        content: editContent,
        public: editPublic,
        approved: false,
      });

      const updated = posts.map(p =>
        p.id === editingId
          ? { ...p, title: editTitle, content: editContent, public: editPublic, approved: false }
          : p
      );

      setFinalPosts(updated);
      setEditingId(null);

      setModal({
        type: "success",
        title: "Post Updated",
        message: "Your post has been updated and will be re-reviewed.",
      });
    } catch (err) {
      setModal({
        type: "error",
        title: "Edit Error",
        message: err.message,
      });
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "posts", confirmDeleteId));
      const remaining = posts.filter(p => p.id !== confirmDeleteId);
      setFinalPosts(remaining);
      setConfirmDeleteId(null);

      setModal({
        type: "success",
        title: "Post Deleted",
        message: "The post has been removed successfully.",
      });
    } catch (err) {
      setModal({
        type: "error",
        title: "Delete Error",
        message: err.message,
      });
    }
  };

  useEffect(() => {
    if (!overridePosts) {
      fetchPosts();
    } else {
      setPosts(overridePosts);
      setLoading(false);
    }
  }, [overridePosts, user, fetchPosts]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : posts.length === 0 ? (
        <p>No posts to display.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="post">
            {editingId === post.id ? (
              <form className="edit-form" onSubmit={(e) => {
                e.preventDefault();
                saveEdit();
              }}>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Post title"
                />
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  placeholder="Post content"
                />
                <label className="checkbox-row">
                  <input
                    type="checkbox"
                    checked={editPublic}
                    onChange={(e) => setEditPublic(e.target.checked)}
                  />
                  Make post public
                </label>
                <div className="edit-buttons">
                  <button type="submit">Save</button>
                  <button type="button" onClick={() => setEditingId(null)}>Cancel</button>
                </div>
              </form>
            ) : (
              <>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <small>By {post.authorEmail}</small><br />
                <small>Status: {post.public ? (post.approved ? "Public" : "Pending Review") : "Private"}</small>
                {user && user.uid === post.authorId && (
                  <div className="edit-buttons">
                    <button onClick={() => startEdit(post)}>Edit</button>
                    <button onClick={() => setConfirmDeleteId(post.id)}>Delete</button>
                  </div>
                )}
              </>
            )}
          </div>
        ))
      )}

      {confirmDeleteId && (
        <Modal
          type="error"
          title="Confirm Deletion"
          message="Are you sure you want to delete this post?"
          onClose={() => setConfirmDeleteId(null)}
          onConfirm={handleDelete}
          confirmText="Delete"
        />
      )}
    </>
  );
}

export default PostList;
