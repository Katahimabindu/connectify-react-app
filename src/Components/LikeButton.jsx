// Dumb component: receives props only
function LikeButton({ liked, likes, onLike }) {
  return (
    <button onClick={onLike}>
      {/* Show filled heart if liked, empty if not */}
      {liked ? "❤️" : "🤍"} {likes}
    </button>
  );
}

export default LikeButton;
