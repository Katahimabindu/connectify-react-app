import { useState } from "react";
import { useWebSocket } from "../Context/WebSocketContext";
import LikeButton from "./LikeButton";

// function Post({ post }) {
function Post({ post, isTrending }) {

  const { likePost, addComment, deletePost } = useWebSocket();
  const [comment, setComment] = useState("");

  const handleComment = () => {
    if (!comment.trim()) return;
    addComment(post.id, comment);
    setComment("");
  };

  return (
    <div className="post-card">
      <div className="post-header">
  <h4>
    {post.name}
    {isTrending && <span className="trending-badge">🔥 Trending</span>}
  </h4>
  <button onClick={() => deletePost(post.id)}>🗑</button>
</div>

      <p className="post-content">{post.content}</p>

      <div className="post-buttons">
        <LikeButton
          liked={post.liked}
          likes={post.likes}
          onLike={() => likePost(post.id)}
        />
      </div>

      {/* Comments */}
      <div className="comments">
        {post.comments.map((c) => (
          <div key={c.id} className="comment">
            <strong>{c.name}:</strong> {c.content}
          </div>
        ))}

        <input
          type="text"
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={handleComment}>Comment</button>
      </div>
    </div>
  );
}

export default Post;