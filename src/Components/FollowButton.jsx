import { useState } from "react";

function FollowButton() {
  const [following, setFollowing] = useState(false);

  return (
    <button
      onClick={() => setFollowing(!following)}
      className={`px-2 py-1 text-xs rounded border ${
        following ? "bg-green-500 text-white" : ""
      }`}
    >
      {following ? "Following" : "Follow"}
    </button>
  );
}

export default FollowButton;
