import LikeButton from "./LikeButton";
import FollowButton from "./FollowButton";
import CommentToggle from "./CommentToggle";

function PostCard({ post, onLike }) {
  return (
    <div className="border p-3 rounded shadow-sm my-3 bg-white">
      <div className="flex justify-between items-center mb-1">
        <h4 className="font-semibold">{post.name}</h4>
        <FollowButton />
      </div>

      <p className="text-sm">{post.content}</p>

      <div className="flex gap-2 mt-2 items-center">
        <LikeButton liked={post.liked} likes={post.likes || 0} onLike={onLike} />
        <CommentToggle comments={post.comments} />
      </div>
    </div>
  );
}

export default PostCard;
