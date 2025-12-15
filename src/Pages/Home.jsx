// Home page holds the UI layout
// Logic is still local to child components (Day 2 focus)

import CreatePost from "../Components/CreatePost";
import PostCard from "../Components/PostCard";

function Home() {
  return (
    <>
      {/* Create post section */}
      <CreatePost />

      {/* Single post card (static for now) */}
      <PostCard />
    </>
  );
}

export default Home;
