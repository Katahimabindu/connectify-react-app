import CreatePost from "../Components/CreatePost";
import PostCard from "../Components/PostCard";
import { useState } from "react";

function Home() {
  // Array of posts with individual states
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Hima Bindu",
      content: "Hello I'm Connectify",
      liked: false,
      likes: 0,
      following: false,
      showComments: false,
    },
    {
      id: 2,
      author: "John Doe",
      content: "This is my first post",
      liked: false,
      likes: 0,
      following: false,
      showComments: false,
    },
  ]);

  // Handle Like button for specific post
  const handleLike = (id) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  // Handle Follow button for specific post
  const handleFollow = (id) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, following: !post.following } : post
      )
    );
  };

  // Toggle comments for specific post
  const toggleComments = (id) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, showComments: !post.showComments } : post
      )
    );
  };

  return (
    <>
      <CreatePost />

      {/* Render all posts using map */}
      {posts.map((post) => (
        <PostCard
          key={post.id}
          liked={post.liked}
          likes={post.likes}
          onLike={() => handleLike(post.id)}
          following={post.following}
          onFollow={() => handleFollow(post.id)}
          showComments={post.showComments}
          toggleComments={() => toggleComments(post.id)}
          author={post.author}
          content={post.content}
        />
      ))}
    </>
  );
}

export default Home;
