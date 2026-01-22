import Navbar from "../Components/Navbar";
import CreatePost from "../Components/CreatePost";
import Profile from "./Profile";
import Post from "../Components/Post";
import FollowingBar from "../Components/FollowingBar";
import { useWebSocket } from "../Context/WebSocketContext";

function Home() {
  const { posts, addPost, topRef } = useWebSocket();

  const currentUser = "Hima Bindu";
  const userPosts = posts.filter(p => p.name === currentUser);

  const totalLikes = userPosts.reduce((sum, p) => sum + (p.likes || 0), 0);
  const totalComments = userPosts.reduce((sum, p) => sum + (p.comments?.length || 0), 0);

  return (
    <>
      <Navbar />

      {/* 3 Column Layout */}
      <div className="page">
        
        {/* LEFT COLUMN */}
        <div className="left">
          <Profile
            user={currentUser}
            postCount={userPosts.length}
            totalLikes={totalLikes}
            totalComments={totalComments}
          />
        </div>

        {/* CENTER COLUMN */}
        <div className="center">
          <div ref={topRef}></div>

          <CreatePost addPost={addPost} />

          {userPosts.length === 0 ? (
            <div className="empty">No posts yet</div>
          ) : (
            userPosts.map(post => (
              <Post key={post.id} post={post} />
            ))
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div className="right">
          <FollowingBar />
        </div>

      </div>
    </>
  );
}

export default Home;
