import { useState } from "react";
import { useWebSocket } from "../Context/WebSocketContext";

function Post({ post }) {
  const { likePost, addComment, deletePost } = useWebSocket();
  const [text, setText] = useState("");

  return (
    <div className="post-card">
      <h4>{post.name}</h4>
      <p>{post.content}</p>

      <button onClick={() => likePost(post.id)}>❤️ {post.likes || 0}</button>
      <button onClick={() => deletePost(post.id)}>Delete</button>

      <div>
        {post.comments?.map((c) => (
          <p key={c.id}>
            {c.name}: {c.content}
          </p>
        ))}
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Comment..."
        />
        <button
          onClick={() => {
            addComment(post.id, "Hima Bindu", text);
            setText("");
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default Post;
