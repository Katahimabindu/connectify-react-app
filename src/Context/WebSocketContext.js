// WebSocketContext.js - Final version for deployment
import { createContext, useContext, useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const WebSocketContext = createContext();

export function WebSocketProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const wsRef = useRef(null);
  const msgQueue = useRef([]);

  // Ping backend to wake up before WebSocket
  const pingBackend = async () => {
    try {
      await fetch("https://connectify-backend-ym5z.onrender.com/ping");
    } catch (err) {
      console.error("Backend ping failed", err);
    }
  };

  const initWebSocket = () => {
    const ws = new WebSocket("wss://connectify-backend-app-3ad8.onrender.com"); // <-- fixed path
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("✅ WS connected");
      // Send queued messages
      msgQueue.current.forEach((msg) => ws.send(JSON.stringify(msg)));
      msgQueue.current = [];
      setLoading(false);
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

    ws.onclose = () => {
      console.log("❌ WS closed, retrying in 5s");
      setTimeout(() => initWebSocket(), 5000);
    };
  };

  useEffect(() => {
    const wakeBackend = async () => {
      await pingBackend();
      initWebSocket();
    };
    wakeBackend();
    return () => wsRef.current?.close();
  }, []);

  const send = (msg) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    } else {
      msgQueue.current.push(msg);
    }
  };

  // ------------------
  // ACTIONS
  // ------------------
  const addPost = (content) => {
    const post = { id: Date.now(), name: "Hima Bindu", content };
    send({ type: "NEW_POST", post });
    toast.success("Post added");
  };

  const likePost = (id, user = "Hima Bindu") => {
    send({ type: "LIKE_POST", id, user });
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

  // Loading spinner while backend wakes
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ border: '8px solid #f3f3f3', borderTop: '8px solid #3498db', borderRadius: '50%', width: '60px', height: '60px', animation: 'spin 1s linear infinite' }} />
        <style>{`@keyframes spin {0% { transform: rotate(0deg);} 100% { transform: rotate(360deg);}}`}</style>
      </div>
    );
  }

  return (
    <WebSocketContext.Provider value={{ posts, following, addPost, likePost, addComment, deletePost, followUser }}>
      {children}
      <Toaster position="top-center" />
    </WebSocketContext.Provider>
  );
}

export const useWebSocket = () => useContext(WebSocketContext);
