// Import Follow button
import FollowButton from "./FollowButton";

function PostHeader() {
  return (
    // Header section of post
    <div className="post-header">
      
      {/* Username */}
      <span className="username">hima_bindhu</span>

      {/* Follow / Unfollow button */}
      <FollowButton />
    </div>
  );
}

export default PostHeader;
