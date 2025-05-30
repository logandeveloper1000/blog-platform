// src/pages/Home.js
import React from "react";
import PostList from "../components/PostList";

function Home() {
  return (
    <div className="container">
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>Blog Platform</h1>
      <div className="home-posts">
        <PostList onlyUserPosts={false} />
    </div>
    </div>
  );
}

export default Home;
