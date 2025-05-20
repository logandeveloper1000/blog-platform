// src/components/PostForm.js
import React, { useState, useContext } from "react";
import { db, auth } from "../firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";

function PostForm({ onPostCreated }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const { setModal } = useContext(AuthContext);

  const handlePost = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return;

    try {
      const docRef = await addDoc(collection(db, "posts"), {
        title,
        content,
        public: isPublic,
        approved: false, // admin must approve
        createdAt: Timestamp.now(),
        authorId: user.uid,
        authorEmail: user.email,
      });

      const newPost = {
        id: docRef.id,
        title,
        content,
        public: isPublic,
        approved: false,
        authorId: user.uid,
        authorEmail: user.email,
      };

      onPostCreated(newPost);
      setTitle("");
      setContent("");
      setIsPublic(true);

      setModal({
        type: "success",
        title: "Post Created",
        message: "Your post has been submitted.",
      });
    } catch (err) {
      setModal({
        type: "error",
        title: "Post Error",
        message: err.message,
      });
    }
  };

  return (
    <form className="post-form" onSubmit={handlePost}>
      <h3>Create Post</h3>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Write your post..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      ></textarea>

      <label className="checkbox-row">
        <input
          type="checkbox"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
        />
        Make post public
      </label>

      {isPublic && (
        <p style={{ fontSize: "0.9rem", color: "#555", marginTop: "-0.5rem" }}>
          Note: Your post will be reviewed by an admin before it becomes public.
        </p>
      )}

      <button type="submit">Post</button>
    </form>
  );
}

export default PostForm;
