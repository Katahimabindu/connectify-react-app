import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import CreatePost from "../Components/CreatePost";
import Post from "../Components/Post";

function Home() {
  // Load posts from localStorage or empty array
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem("posts");
    return savedPosts ? JSON.parse(savedPosts) : [];
  });

  // Save posts to localStorage whenever posts change
  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  // Add new post
  const addPost = (content) => {
    const newPost = {
      id: Date.now(),
      name: "Hema Bindu",
      content,
      liked: false,
      likes: 0,
      comments: [],
    };
    setPosts([newPost, ...posts]);
  };

  // Update a post (like or add comment)
  const updatePost = (updatedPost) => {
    setPosts(posts.map((p) => (p.id === updatedPost.id ? updatedPost : p)));
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <CreatePost addPost={addPost} />
        {posts.map((post) => (
          <Post key={post.id} post={post} updatePost={updatePost} />
        ))}
      </div>
    </>
  );
}

export default Home;
