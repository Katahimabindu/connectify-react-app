import { useState } from "react";
import CommentToggle from "./CommentToggle";
import PostHeader from "./PostHeader";

function Post({ post, onLike, onDelete, onAddComment }) {
  const [commentText, setCommentText] = useState("");

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    onAddComment(post.id, commentText);
    setCommentText("");
  };
  console.log("POST DATA:", post);
console.log("IS TRENDING?", post.likes.length >= 5);


  return (
    <div className="post">
      {/* HEADER (username + follow + trending badge) */}
      <PostHeader post={post} />

      {/* POST CONTENT */}
      <p style={{ marginBottom: "8px" }}>{post.text}</p>

      {/* ACTIONS */}
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <button onClick={() => onLike(post.id)}>
          ❤️ {post.likes?.length || 0}
        </button>

        <span>💬 {post.comments?.length || 0}</span>
      </div>

      {/* COMMENTS TOGGLE */}
      <CommentToggle comments={post.comments} />

      {/* ADD COMMENT */}
      <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
        <input
          type="text"
          value={commentText}
          placeholder="Add comment..."
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button onClick={handleAddComment}>Add</button>
      </div>

      {/* DELETE */}
      <button
        onClick={() => onDelete(post.id)}
        style={{ marginTop: "8px", color: "red" }}
      >
        Delete
      </button>
    </div>
  );
}

export default Post;
