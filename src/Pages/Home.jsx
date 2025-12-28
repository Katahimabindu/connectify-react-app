import Post from "../Components/Post";

function Home() {
  const posts = [
    { id: 1, author: "Hima Bindu", content: "This is my first post", comments: [] },
    { id: 2, author: "Ravi", content: "Hello React!", comments: [] },
    { id: 3, author: "Anita", content: "Learning React is fun!", comments: [] },
  ];

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h1>My Social Feed</h1>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Home;
