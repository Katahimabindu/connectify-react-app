import LikeButton from "./LikeButton";
import FollowButton from "./FollowButton";
import Comments from "./Comments";

function PostCard({ liked, likes, onLike, following, onFollow, showComments, toggleComments }) {
  return (
    <div>
      {/* Post author */}
      <h4>himabindu</h4>

      {/* Post content */}
      <p>Hello I'm Connectify</p>

      {/* Like button */}
      <LikeButton liked={liked} likes={likes} onLike={onLike} />

      {/* Follow button */}
      <FollowButton following={following} onFollow={onFollow} />

      {/* Toggle comments button */}
      <button onClick={toggleComments}>
        {showComments ? "Hide Comments" : "Show Comments"}
      </button>

      {/* Render Comments if showComments is true */}
      {showComments && <Comments />}
    </div>
  );
}

export default PostCard;
