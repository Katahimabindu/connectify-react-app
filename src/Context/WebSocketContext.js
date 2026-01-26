import { createContext, useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const WebSocketContext = createContext();

export function WebSocketProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [following, setFollowing] = useState([]);

  const wsRef = useRef(null);
  const topRef = useRef(null);

  const userId = useRef(localStorage.getItem("uid") || crypto.randomUUID());

  useEffect(() => {
    localStorage.setItem("uid", userId.current);

    const ws = new WebSocket("ws://localhost:8080");
    wsRef.current = ws;

    ws.onopen = () => toast.success("Connected");

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);

      if (data.type === "INIT_POSTS") setPosts(data.posts);

      if (data.type === "NEW_POST") {
        setPosts(p => [data.post, ...p]);
        toast.success("Post added");
      }

      if (data.type === "UPDATE_POSTS") {
        setPosts(data.posts);
      }
    };

    return () => ws.close();
  }, []);

  const sendEvent = (payload) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(payload));
    }
  };

  return (
    <WebSocketContext.Provider
      value={{
        posts,
        topRef,
        following,
        addPost: (content) =>
          sendEvent({ type: "NEW_POST", name: "Hima Bindu", content }),

        likePost: (id) =>
          sendEvent({ type: "LIKE_POST", id, userId: userId.current }),

        addComment: (postId, name, content) =>
          sendEvent({ type: "ADD_COMMENT", postId, name, content }),

        deletePost: (id) =>
          sendEvent({ type: "DELETE_POST", id }),

        followUser: (u) =>
          setFollowing(p => (p.includes(u) ? p : [...p, u]))
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
}

export const useWebSocket = () => useContext(WebSocketContext);
