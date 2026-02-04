import { createContext, useContext, useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const WebSocketContext = createContext();

export function WebSocketProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [following, setFollowing] = useState([]);
  const wsRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5000");
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("✅ WS connected");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("📩 WS message:", data);

      if (data.type === "INIT_POSTS" || data.type === "UPDATE_POSTS") {
        setPosts(data.posts);
      }

      if (data.type === "FOLLOW_UPDATE") {
        setFollowing(data.following);
      }
    };

    ws.onerror = () => toast.error("WebSocket error");
    ws.onclose = () => console.log("❌ WS closed");

    return () => ws.close();
  }, []);

  const send = (msg) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    }
  };

  const addPost = (content) => {
    const post = {
      id: Date.now(),
      name: "Hima Bindu",
      content,
    };

    console.log("📤 Sending post:", post);
    send({ type: "NEW_POST", post });
    toast.success("Post added");
  };

  const likePost = (id) => {
    send({ type: "LIKE_POST", id });//static for now
  };

  const addComment = (id, name, content) => {
    send({ type: "ADD_COMMENT", id, name, content });
  };

  const deletePost = (id) => {
    send({ type: "DELETE_POST", id });
  };

  const followUser = (user) => {
    console.log("➡️ Follow clicked:", user);
    send({ type: "FOLLOW_USER", user });
    toast.success(`You followed ${user}`);
  };

  return (
    <WebSocketContext.Provider
      value={{
        posts,
        following,
        addPost,
        likePost,
        addComment,
        deletePost,
        followUser,
      }}
    >
      {children}
      <Toaster position="top-center" />
    </WebSocketContext.Provider>
  );
}

export const useWebSocket = () => useContext(WebSocketContext);