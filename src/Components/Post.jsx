import { useState } from "react";

function Post({ post, updatePost }) {
  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState("");

  // Toggle like
  const toggleLike = () => {
    updatePost({ ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 });
  };

  // Add comment
  const addComment = () => {
    if (!commentInput.trim()) return;
    const updatedPost = {
      ...post,
      comments: [...post.comments, { id: Date.now(), text: commentInput }],
    };
    updatePost(updatedPost);
    setCommentInput("");
  };

  // Delete comment
  const deleteComment = (id) => {
    const updatedPost = {
      ...post,
      comments: post.comments.filter((c) => c.id !== id),
    };
    updatePost(updatedPost);
  };

  return (
    <div className="post">
      <h4>{post.name}</h4>
      <p>{post.content}</p>
      <div className="post-actions">
        <button onClick={toggleLike}>{post.liked ? "❤️" : "Like"} ({post.likes})</button>
        <button onClick={() => setShowComments(!showComments)}>Comment ({post.comments.length})</button>
      </div>

      {showComments && (
        <div className="comments-section">
          {post.comments.map((c) => (
            <div key={c.id} className="comment">
              {c.text} <button onClick={() => deleteComment(c.id)}>Delete</button>
            </div>
          ))}
          <input
            type="text"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="Add a comment"
          />
          <button onClick={addComment}>Add</button>
        </div>
      )}
    </div>
  );
}

export default Post;
