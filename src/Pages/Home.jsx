import Navbar from "../Components/Navbar";
import CreatePost from "../Components/CreatePost";
import Post from "../Components/Post";
import FollowingBar from "../Components/FollowingBar";
import { useWebSocket } from "../Context/WebSocketContext";
const getTrendingScore = (post) => {
  const likes = post.likes || 0;
  const comments = post.comments?.length || 0;
  return likes * 2 + comments * 3;
};


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
          
          [...posts].sort((a, b) => getTrendingScore(b) - getTrendingScore(a)).map((post) => (
    <Post
      key={post.id}
      post={post}
      isTrending={getTrendingScore(post) >= 10}
    />
  ))

        )}
      </div>
    </>
  );
}

export default Home;