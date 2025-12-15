// Import useState for state management
import { useState } from "react";

// Import icons from react-icons
import { FaComment, FaThumbsUp, FaFire } from "react-icons/fa";

function CommentToggle() {
  // Controls whether comments are shown or hidden
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="comment-section">
      
      {/* Button to toggle comments */}
      <button
        className="comment-btn"
        onClick={() => setShowComments(!showComments)}
      >
        <FaComment />
        {showComments ? " Hide Comments" : " View Comments"}
      </button>

      {/* Show comments only when showComments is true */}
      {showComments && (
        <div className="comments">
          
          {/* Comment 1 */}
          <p>
            <FaThumbsUp /> Nice post
          </p>

          {/* Comment 2 */}
          <p>
            <FaFire /> Awesome
          </p>

        </div>
      )}
    </div>
  );
}

export default CommentToggle;
