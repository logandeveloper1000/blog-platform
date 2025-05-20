// src/pages/AdminDashboard.js
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, doc, updateDoc, query, where } from "firebase/firestore";
/*----------*/
import { auth } from "../firebase";



function AdminDashboard() {
  const [pendingPosts, setPendingPosts] = useState([]);

  const fetchPending = async () => {
    const q = query(collection(db, "posts"), where("public", "==", true), where("approved", "==", false));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setPendingPosts(data);
  };

  const approvePost = async (id) => {
    await updateDoc(doc(db, "posts", id), { approved: true });
    setPendingPosts(prev => prev.filter(p => p.id !== id));
  };

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      window.location.href = "/Admin";
    } else {
      fetchPending();
    }
  }, []);
/*----------*/
 useEffect(() => {
  const checkClaims = async () => {
    if (auth.currentUser) {
      const token = await auth.currentUser.getIdTokenResult();
      console.log("Custom claims:", token.claims);
    } else {
      console.log("No user logged in");
    }
  };

  checkClaims();
}, []);

  return (
    <div className="container">
      <h2>Pending Posts for Review</h2>
      {pendingPosts.length === 0 ? (
        <p>No pending posts.</p>
      ) : (
        pendingPosts.map(post => (
          <div key={post.id} className="post">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <small>By: {post.authorEmail}</small><br />
            <button onClick={() => approvePost(post.id)}>Approve</button>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminDashboard;
