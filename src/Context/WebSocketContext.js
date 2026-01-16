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

    ws.onopen = () => {
      console.log("Connected to WebSocket server");
      toast.success("WebSocket connected!");
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === "INIT_POSTS" || data.type === "UPDATE_POSTS") {
          setPosts(data.posts || []);
        }

        // ❗ REMOVE toast from here so it doesn't show twice
        if (data.type === "NEW_POST") {
          setPosts(prev => [data.post, ...prev]);
          topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }

      } catch (err) {
        console.error("WebSocket message error", err);
      }
    };

    ws.onerror = () => toast.error("WebSocket not connected ❌");
    ws.onclose = () => console.log("WebSocket disconnected");

    return () => ws.close();
  }, []);

  const sendEvent = (event) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(event));
    }
  };

  const addPost = (content) => {
    const newPost = {
      id: Date.now(),
      name: "Hima Bindu",
      content,
      likes: 0,
      liked: false,
      comments: [],
    };

    setPosts(prev => [newPost, ...prev]); 
    sendEvent({ type: "NEW_POST", post: newPost });

    // 🔥 Now only 1 toast appears from here
    toast.success("Post added!");
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const likePost = (id) => {
    setPosts(prev =>
      prev.map(p =>
        p.id === id ? { ...p, likes: p.liked ? p.likes - 1 : p.likes + 1, liked: !p.liked } : p
      )
    );
    sendEvent({ type: "LIKE_POST", id });
  };

  const addComment = (id, name, content) => {
    setPosts(prev =>
      prev.map(p =>
        p.id === id ? { ...p, comments: [...p.comments, { id: Date.now(), name, content }] } : p
      )
    );
    sendEvent({ type: "ADD_COMMENT", id, name, content });
  };

  const deletePost = (id) => {
    setPosts(prev => prev.filter(p => p.id !== id));
    sendEvent({ type: "DELETE_POST", id });
  };

  const followUser = (user) => {
    setFollowing(prev => prev.includes(user) ? prev : [...prev, user]);
    toast.success(`You followed ${user}`);
  };

  return (
    <WebSocketContext.Provider value={{
      posts,
      addPost,
      likePost,
      addComment,
      deletePost,
      followUser,
      sendEvent,
      topRef,
      following,
    }}>
      <div ref={topRef}></div>
      {children}
      <Toaster position="top-center" reverseOrder={false} />
    </WebSocketContext.Provider>
  );
}

export function useWebSocket() {
  return useContext(WebSocketContext);
}
