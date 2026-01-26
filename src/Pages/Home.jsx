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

  return (
    <>
      <Navbar />

      <div className="page">
        <div className="left">
          <Profile user={currentUser} posts={userPosts} />
        </div>

        <div className="center">
          <div ref={topRef}></div>
          <CreatePost addPost={addPost} />

          {posts.map(post => (
            <Post key={post.id} post={post} />
          ))}
        </div>

        <div className="right">
          <FollowingBar />
        </div>
      </div>
    </>
  );
}

export default Home;
