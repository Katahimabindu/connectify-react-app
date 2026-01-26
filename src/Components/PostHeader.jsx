import React from "react";

function PostHeader({ post }) {
  // Decide trending purely based on comments length
  const isTrending = post.comments.length >= 5;
console.log("Post comments length:", post.comments.length, "Trending?", post.comments.length >= 5);

  return (
    <div className="post-header">
      <span className="username">{post.name}</span>

      {/* Only show badge if trending */}
      {isTrending && (
        <span className="trending-badge">🔥 Trending</span>
      )}
    </div>
  );
}

export default PostHeader;
