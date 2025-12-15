// Import useState
import { useState } from "react";

// Import icons
import { FaUserPlus, FaUserCheck } from "react-icons/fa";

function FollowButton() {
  // Track follow state
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    // Toggle follow state on click
    <button onClick={() => setIsFollowing(!isFollowing)}>
      
      {/* Icon changes based on state */}
      {isFollowing ? <FaUserCheck /> : <FaUserPlus />}

      {/* Text changes */}
      {isFollowing ? " Following" : " Follow"}
    </button>
  );
}

export default FollowButton;
