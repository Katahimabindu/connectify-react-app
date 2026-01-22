
import { useState } from "react";
import { useWebSocket } from "../Context/WebSocketContext";

function CreatePost() {
  const { addPost } = useWebSocket();
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    addPost(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="create-post">
      <input
        type="text"
        placeholder="What's on your mind?"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">Post</button>
    </form>
  );
}

export default CreatePost;