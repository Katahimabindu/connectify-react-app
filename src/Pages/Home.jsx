import CreatePost from "../Components/CreatePost";
import Navbar from "../Components/Navbar";
import Post from "../Components/Post";
function Home(){
return(
    <>
    <Navbar/>
    <div className="container">
        <CreatePost/>
        <Post/>
    </div>
    </>
);
}
export default Home;