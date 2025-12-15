// Import useState to manage input state
import { useState } from "react";

function CreatePost() {
  // Stores text typed by user
  const [postText, setPostText] = useState("");

  // Runs when Post button is clicked
  const handlePost = () => {
    // Prevent empty or space-only posts
    if (postText.trim() === "") return;

    // Temporary action (Day 3 will add to posts array)
    console.log("Post created:", postText);

    // Clear input after posting
    setPostText("");
  };

  return (
    // Container div used for styling
    <div className="create-post">
      {/* Controlled textarea */}
      <textarea
        placeholder="What's on your mind?"
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
      />

      {/* Post button */}
      <button onClick={handlePost}>Post</button>
    </div>
  );
}

export default CreatePost;
