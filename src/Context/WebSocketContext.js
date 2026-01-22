import { createContext, useContext, useEffect, useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";

const WebSocketContext = createContext();

export function WebSocketProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [following, setFollowing] = useState([]);
  const wsRef = useRef(null);
  const topRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    wsRef.current = ws;

    ws.onopen = () => toast.success("Connected");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      switch (data.type) {
        case "INIT_POSTS":
        case "UPDATE_POSTS":
          setPosts(data.posts || []);
          break;

        case "NEW_POST":
          setPosts(prev =>
            prev.some(p => p.id === data.post.id)
              ? prev
              : [data.post, ...prev]
          );
          topRef.current?.scrollIntoView({ behavior: "smooth" });
          break;

        case "DELETE_POST":
          setPosts(prev => prev.filter(p => p.id !== data.id));
          break;

        default:
          break;
      }
    };

    return () => ws.close();
  }, []);

  const sendEvent = (event) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(event));
    }
  };

  const addPost = (content) => {
    sendEvent({
      type: "NEW_POST",
      post: {
        id: Date.now(),
        name: "Hima Bindu",
        content,
        likes: 0,
        liked: false,
        comments: [],
      },
    });
    toast.success("Post added!");
  };

  const likePost = (id) => sendEvent({ type: "LIKE_POST", id });
  const addComment = (id, name, content) =>
    sendEvent({ type: "ADD_COMMENT", id, name, content });
  const deletePost = (id) => sendEvent({ type: "DELETE_POST", id });

  const followUser = (user) => {
    setFollowing(prev => prev.includes(user) ? prev : [...prev, user]);
    toast.success(`You followed ${user}`);
  };

  return (
    <WebSocketContext.Provider
      value={{
        posts,
        addPost,
        likePost,
        addComment,
        deletePost,
        followUser,
        following,
        topRef
      }}
    >
      {children}
      <Toaster position="top-center" />
    </WebSocketContext.Provider>
  );
}

export function useWebSocket() {
  return useContext(WebSocketContext);
}
