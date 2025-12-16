import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

function LikeButton() {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const handleLike = () => {
    // Update like count based on current liked state
    setLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));

    // Toggle liked state
    setLiked(!liked);
  };

  return (
    <button className="like-btn" onClick={handleLike}>
      {liked ? <FaHeart className="liked-icon" /> : <FaRegHeart />}
      <span className="like-text">
        {likeCount} {likeCount === 1 ? "Like" : "Likes"}
      </span>
    </button>
  );
}

export default LikeButton;
