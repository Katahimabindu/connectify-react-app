function LikeButton({ liked, likes, onLike }) {
  return (
    <button
      onClick={onLike}
      className={`px-2 py-1 text-xs rounded border ${
        liked ? "bg-red-500 text-white" : ""
      }`}
    >
      ❤️ {likes}
    </button>
  );
}

export default LikeButton;
