// Import useState
import { useState } from "react";

// Import heart icons
import { FaHeart, FaRegHeart } from "react-icons/fa";

function LikeButton() {
  // Tracks like/unlike
  const [liked, setLiked] = useState(false);

  // Stores like count
  const [likeCount, setLikeCount] = useState(0);

  // Handle like toggle
  const handleLike = () => {
    if (liked) {
      // Unlike → decrease count
      setLikeCount(likeCount - 1);
    } else {
      // Like → increase count
      setLikeCount(likeCount + 1);
    }

    // Toggle liked state
    setLiked(!liked);
  };

  return (
    <button className="like-btn" onClick={handleLike}>
      
      {/* Icon changes */}
      {liked ? <FaHeart className="liked-icon" /> : <FaRegHeart />}

      {/* Like count */}
      <span className="like-text">
        {likeCount} {likeCount === 1 ? "Like" : "Likes"}
      </span>
    </button>
  );
}

export default LikeButton;
