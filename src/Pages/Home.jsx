import Navbar from "../Components/Navbar";
import CreatePost from "../Components/CreatePost";
import Profile from "./Profile";
import Post from "../Components/Post";
import { useWebSocket } from "../Context/WebSocketContext";

function Home() {
  const { posts, topRef } = useWebSocket();
  const currentUser = "Hima Bindu";

  const userPosts = posts.filter(p => p.name === currentUser);
  const totalLikes = userPosts.reduce((sum, p) => sum + (p.likes || 0), 0);
  const totalComments = userPosts.reduce((sum, p) => sum + (p.comments?.length || 0), 0);

  return (
    <>
      <Navbar />
      <div className="container p-4 max-w-md mx-auto">
        <CreatePost />
        <Profile user={currentUser} postCount={userPosts.length} totalLikes={totalLikes} totalComments={totalComments} />

        <div ref={topRef}></div>

        {userPosts.length === 0 ? (
          <h3 className="text-center text-gray-500">No posts yet</h3>
        ) : (
          userPosts.map(post => <Post key={post.id} post={post} />)
        )}
      </div>
    </>
  );
}

export default Home;
