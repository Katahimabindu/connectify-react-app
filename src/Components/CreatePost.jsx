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
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Write a post..."
        className="border px-2 py-1 rounded flex-1 text-sm"
      />
      <button type="submit" className="bg-blue-600 text-white px-3 rounded text-sm">
        Post
      </button>
    </form>
  );
}

export default CreatePost;
