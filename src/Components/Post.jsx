import { useState } from "react";
import { useWebSocket } from "../Context/WebSocketContext";

function Post({ post }) {
  const { likePost, addComment, deletePost, userId } = useWebSocket();
  const [show, setShow] = useState(false);
  const [input, setInput] = useState("");

  const liked = post.likes.includes(userId);
  const trendingScore = post.likes.length + post.comments.length;

  const submit = () => {
    if (!input.trim()) return;
    addComment(post.id, "Hima Bindu", input);
    setInput("");
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <h4>{post.name}</h4>
        {trendingScore >= 3 && <span className="trending">🔥 Trending</span>}
        <button onClick={() => deletePost(post.id)}>Delete</button>
      </div>

      <div className="post-content">{post.content}</div>

      <div className="post-buttons">
        <button
          onClick={() => likePost(post.id)}
          className={liked ? "like-button liked" : "like-button"}
        >
          ❤️ {post.likes.length}
        </button>

        <button onClick={() => setShow(!show)}>
          💬 Comments ({post.comments.length})
        </button>
      </div>

      {show && (
        <div className="comments">
          {post.comments.map(c => (
            <div key={c.id} className="comment">
              <b>{c.name}</b>: {c.content}
            </div>
          ))}
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Add comment..."
            onKeyDown={e => e.key === "Enter" && submit()}
          />
          <button onClick={submit}>Add</button>
        </div>
      )}
    </div>
  );
}

export default Post;
