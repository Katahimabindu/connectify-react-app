// Import child components
import PostHeader from "./PostHeader";
import LikeButton from "./LikeButton";
import CommentToggle from "./CommentToggle";

function PostCard() {
  return (
    // One post container
    <div className="post-card">
      
      {/* Post header: username + follow */}
      <PostHeader />

      {/* Post content */}
      <p className="post-content">
        This is my first Connectify post 🚀
      </p>

      {/* Post actions */}
      <div className="post-actions">
        <LikeButton />
        <CommentToggle />
      </div>
    </div>
  );
}

export default PostCard;
