import Navbar from "../Components/Navbar";
import CreatePost from "../Components/CreatePost";
import Post from "../Components/Post";
import FollowingBar from "../Components/FollowingBar";
import { useWebSocket } from "../Context/WebSocketContext";

function Home() {
  const { posts } = useWebSocket();

  console.log("🏠 Home posts:", posts);

  return (
    <>
      <Navbar />
      <div className="container">
        <FollowingBar />
        <CreatePost />

        {posts.length === 0 ? (
          <h3 style={{ textAlign: "center" }}>No posts yet</h3>
        ) : (
          posts.map((post) => <Post key={post.id} post={post} />)
        )}
      </div>
    </>
  );
}

export default Home;
