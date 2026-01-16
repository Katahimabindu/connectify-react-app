import Navbar from "../Components/Navbar";
import CreatePost from "../Components/CreatePost";
import Profile from "./Profile";
import Post from "../Components/Post";
import FollowingBar from "../Components/FollowingBar";
import { useWebSocket } from "../Context/WebSocketContext";
import toast, { Toaster } from "react-hot-toast";

function Home() {
  const { posts, addPost, topRef } = useWebSocket();

  const currentUser = "Hima Bindu";
  const userPosts = posts.filter(p => p.name === currentUser);

  const totalLikes = userPosts.reduce((sum, p) => sum + (p.likes || 0), 0);
  const totalComments = userPosts.reduce((sum, p) => sum + (p.comments?.length || 0), 0);

  const handleAddPost = (content) => {
    addPost(content);
    toast.success("Post added!");
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Navbar />

      <div className="container" style={{ maxWidth: "500px", margin: "0 auto", padding: "16px" }}>
        <div ref={topRef}></div>
        <FollowingBar/>

        <CreatePost addPost={handleAddPost} />

        <Profile
          user={currentUser}
          postCount={userPosts.length}
          totalLikes={totalLikes}
          totalComments={totalComments}
        />

        {userPosts.length === 0 ? (
          <h3 style={{ textAlign: "center", color: "#555" }}>No posts yet</h3>
        ) : (
          userPosts.map(post => <Post key={post.id} post={post} />)
        )}
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default Home;
