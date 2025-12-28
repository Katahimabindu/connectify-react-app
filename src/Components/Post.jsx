import { useState } from "react";

function Post({ post }) {
  // 1. State for Like count
  const [likes, setLikes] = useState(0);

  // 2. State for comments of this post
  const [comments, setComments] = useState(post.comments || []);

  // 3. State for new comment input
  const [newComment, setNewComment] = useState("");

  // 4. State to toggle comment section visibility
  const [showComments, setShowComments] = useState(false);

  // Like button click handler
  const handleLike = () => {
    setLikes(likes + 1);
  };

  // Toggle comment section visibility
  const handleToggleComments = () => {
    setShowComments(!showComments);
  };

  // Add new comment
  const handleAddComment = () => {
    if (newComment.trim() === "") return; // Prevent empty comment
    setComments([...comments, { id: Date.now(), text: newComment }]);
    setNewComment(""); // Clear input after adding
  };

  // Delete a comment by id
  const handleDeleteComment = (id) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };

  return (
    <div className="post" style={{ border: "1px solid gray", padding: "10px", margin: "10px 0" }}>
      <h4>{post.author}</h4>
      <p>{post.content}</p>

      <div className="post-actions" style={{ display: "flex", gap: "10px" }}>
        <button onClick={handleLike}>Like ({likes})</button>
        <button onClick={handleToggleComments}>
          {showComments ? "Hide Comments" : "Comment"}
        </button>
      </div>

      {showComments && (
        <div className="comments-section" style={{ marginTop: "10px" }}>
          <div className="comment-list">
            {comments.map((comment) => (
              <div key={comment.id} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <p>{comment.text}</p>
                <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
              </div>
            ))}
          </div>

          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            style={{ marginRight: "5px" }}
          />
          <button onClick={handleAddComment}>Add Comment</button>
        </div>
      )}
    </div>
  );
}

export default Post;
