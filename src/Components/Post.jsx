import { useState } from "react";
import { useWebSocket } from "../Context/WebSocketContext";

function Post({ post }) {
  const { likePost, addComment, deletePost } = useWebSocket();
  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState("");

  return (
    <div className="post-card">
      <div className="post-header">
        <h4>{post.name}</h4>
        <div>
          <button
            onClick={() => deletePost(post.id)}
            style={{ marginLeft: "8px" }}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="post-content">{post.content}</div>
      <div className="post-buttons">
        <button
          onClick={() => likePost(post.id)}
          className={`like-button ${post.liked ? "liked" : ""}`}
        >
          ❤️ {post.likes || 0}
        </button>
        <button onClick={() => setShowComments(!showComments)}>
          {showComments ? "Hide Comments" : `Comments (${post.comments?.length || 0})`}
        </button>
      </div>
      {showComments && (
        <div className="comments">
          {post.comments?.map(c => (
            <p key={c.id}>{c.name}: {c.content}</p>
          ))}
          <div style={{ display: "flex", marginTop: "8px" }}>
            <input
              type="text"
              placeholder="Add comment..."
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addComment(post.id, "Hima Bindu", commentInput) && setCommentInput("")}
            />
            <button onClick={() => { addComment(post.id, "Hima Bindu", commentInput); setCommentInput(""); }}>
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Post;