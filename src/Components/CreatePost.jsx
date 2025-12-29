import { useState } from "react";

function CreatePost({ addPost }) {
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (!content.trim()) return; // prevent empty post
    addPost(content);
    setContent(""); // clear input
  };

  return (
    <div className="create-post">
      <textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleSubmit}>Post</button>
    </div>
  );
}

export default CreatePost;
