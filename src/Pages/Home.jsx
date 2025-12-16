import CreatePost from "./CreatePost";
import PostCard from "./PostCard";
import { useState } from "react";

function Home() {
  // State for LikeButton
  const [liked, setLiked] = useState(false);

  // State for number of likes
  const [likes, setLikes] = useState(0);

  // State for FollowButton
  const [following, setFollowing] = useState(false);

  // State to show or hide comments
  const [showComments, setShowComments] = useState(false);

  // Function to handle Like button click
  const handleLike = () => {
    if (!liked) setLikes(likes + 1);
    else setLikes(likes - 1);

    setLiked(!liked); // toggle liked state
  };

  return (
    <>
      {/* CreatePost component */}
      <CreatePost />

      {/* PostCard component */}
      {/* All state and handlers are passed as props */}
      <PostCard
        liked={liked}
        likes={likes}
        onLike={handleLike}
        following={following}
        onFollow={() => setFollowing(!following)}
        showComments={showComments}
        toggleComments={() => setShowComments(!showComments)}
      />
    </>
  );
}

export default Home;
