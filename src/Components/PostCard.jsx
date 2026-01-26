import PostHeader from "./PostHeader";
import CommentToggle from "./CommentToggle";
import { useWebSocket } from "../Context/WebSocketContext";

function PostCard({ post }) {
  const { send } = useWebSocket();

  const likePost = () => {
    send({ type: "LIKE_POST", id: post.id });
  };

  return (
    <div className="post">
      <PostHeader post={post} />

      <p>{post.content}</p>

      <button onClick={likePost}>❤️ {post.likes.length}</button>

      <CommentToggle comments={post.comments} postId={post.id} />
    </div>
  );
}

export default PostCard;
