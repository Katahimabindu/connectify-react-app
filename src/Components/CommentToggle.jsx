import { useState } from "react";
import Comments from "./Comments";

function CommentToggle({ comments }) {
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="mt-2">
      <button
        onClick={() => setShowComments(!showComments)}
        className="px-2 py-1 text-xs border rounded"
      >
        {showComments ? "Hide Comments" : `View Comments (${comments?.length || 0})`}
      </button>

      {showComments && <Comments comments={comments} />}
    </div>
  );
}

export default CommentToggle;