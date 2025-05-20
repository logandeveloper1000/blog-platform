// src/pages/Dashboard.js
import React, { useEffect, useState, useContext, useCallback } from "react";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import { db } from "../firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {
  const [userPosts, setUserPosts] = useState([]);
  const { user } = useContext(AuthContext);

  const handleNewPost = (newPost) => {
    setUserPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const fetchUserPosts = useCallback(async () => {
    if (!user) return;
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    const allPosts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const myPosts = allPosts.filter((post) => post.authorId === user.uid);
    setUserPosts(myPosts);
  }, [user]);

  useEffect(() => {
    fetchUserPosts();
  }, [fetchUserPosts]);

  return (
    <div className="container">
      <h1>Your Dashboard</h1>
      <PostForm onPostCreated={handleNewPost} />
      <hr />
      <h2>Your Posts</h2>
      <PostList
        onlyUserPosts={true}
        overridePosts={userPosts}
        setOverridePosts={setUserPosts}
      />
    </div>
  );
}

export default Dashboard;
