import { useState, useEffect } from "react";
import { useWebSocket } from "../Context/WebSocketContext";
import toast from "react-hot-toast";

function Post({ post }) {
  const { likePost, addComment, deletePost } = useWebSocket();
  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [following, setFollowing] = useState(false);
  const [visible, setVisible] = useState(false); // fade-in
  const [likedAnimation, setLikedAnimation] = useState(false); // highlight

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleLike = () => {
    likePost(post.id);
    setLikedAnimation(true);
    setTimeout(() => setLikedAnimation(false), 300);
    toast.success(post.liked ? "Like removed!" : "Post liked!", { duration: 1500, position: "top-center" });
  };

  const handleAddComment = () => {
    if (!commentInput.trim()) return;
    addComment(post.id, "Hima Bindu", commentInput);
    setCommentInput("");
    toast.success("Comment added!", { duration: 1500, position: "top-center" });
  };

  const handleFollow = () => {
    setFollowing(!following);
    toast(following ? "Unfollowed user" : "Started following user", { duration: 1500, position: "top-center" });
  };

  return (
    <div className={`${visible ? "opacity-100" : "opacity-0"} transition-opacity duration-500 ${likedAnimation ? "bg-red-100" : "bg-white"} border p-3 rounded shadow-sm my-3`}>
      <div className="flex justify-between items-center mb-1">
        <h4 className="font-semibold">{post.name}</h4>
        <div className="flex gap-2">
          <button
            onClick={handleFollow}
            className={`px-2 py-1 text-xs rounded border hover:bg-green-500 hover:text-white transition ${following ? "bg-green-500 text-white" : ""}`}
          >
            {following ? "Following" : "Follow"}
          </button>
          <button
            onClick={() => deletePost(post.id)}
            className="px-2 py-1 text-xs rounded border hover:bg-red-600 hover:text-white transition bg-red-600 text-white"
          >
            Delete
          </button>
        </div>
      </div>

      <p className="text-sm">{post.content}</p>

      <div className="flex gap-2 mt-2 items-center">
        <button
          onClick={handleLike}
          className={`px-2 py-1 text-xs rounded border hover:bg-gray-100 transition ${post.liked ? "bg-red-500 text-white" : ""}`}
        >
          ❤️ {post.likes || 0}
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="px-2 py-1 text-xs rounded border hover:bg-gray-100 transition"
        >
          {showComments ? "Hide Comments" : `Comments (${post.comments?.length || 0})`}
        </button>
      </div>

      {showComments && (
        <div className="mt-2">
          {post.comments?.length === 0 && <p className="text-xs text-gray-400 mt-1">No comments yet</p>}
          {post.comments?.map((c) => (
            <p key={c.id} className="text-xs border px-2 py-1 rounded mt-1">{c.name}: {c.content}</p>
          ))}

          <div className="flex gap-2 mt-2">
            <input
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Add a comment"
              className="border px-2 py-1 rounded text-xs flex-1"
            />
            <button onClick={handleAddComment} className="px-3 py-1 text-xs rounded border bg-blue-600 text-white">
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Post;
