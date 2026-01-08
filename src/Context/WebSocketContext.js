import { createContext, useContext, useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";

const WebSocketContext = createContext();

export function WebSocketProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const wsRef = useRef(null);
  const topRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    wsRef.current = ws;

    ws.onopen = () => toast.success("WebSocket connected!");
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      switch (data.type) {
        case "INIT_POSTS":
          setPosts(data.posts || []);
          break;

        case "NEW_POST":
          // Only add if it doesn’t already exist
          setPosts(prev => {
            if (!prev.find(p => p.id === data.post.id)) {
              return [data.post, ...prev];
            }
            return prev;
          });
          topRef.current?.scrollIntoView({ behavior: "smooth" });
          break;

        case "UPDATE_POSTS":
          setPosts(data.posts || []);
          break;
      }
    };

    ws.onerror = () => toast.error("WebSocket not connected ❌");
    ws.onclose = () => console.log("WebSocket disconnected");

    return () => ws.close();
  }, []);

  const sendEvent = (event) => {
    if (wsRef.current?.readyState === 1) {
      wsRef.current.send(JSON.stringify(event));
    } else toast.error("WebSocket not connected ❌");
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

    // Add post locally
    setPosts(prev => [newPost, ...prev]);

    // **Trigger toast immediately**
    toast.success("Post added!", { duration: 2000, position: "top-center" });

    // Scroll to top
    topRef.current?.scrollIntoView({ behavior: "smooth" });

    // Send to server
    sendEvent({ type: "NEW_POST", post: newPost });
  };

  const likePost = (id) => {
    setPosts(prev =>
      prev.map(post => {
        if (post.id === id) {
          const updatedLikes = post.liked ? post.likes - 1 : post.likes + 1;
          return { ...post, likes: updatedLikes, liked: !post.liked };
        }
        return post;
      })
    );
    sendEvent({ type: "LIKE_POST", id });
  };

  const addComment = (id, name, content) => {
    const newComment = { id: Date.now(), name, content };
    setPosts(prev =>
      prev.map(post => {
        if (post.id === id) {
          return { ...post, comments: [...post.comments, newComment] };
        }
        return post;
      })
    );
    toast.success("Comment added!", { duration: 1500, position: "top-center" });
    sendEvent({ type: "ADD_COMMENT", id, name, content });
  };

  const deletePost = (id) => {
    setPosts(prev => prev.filter(p => p.id !== id));
    toast.success("Post deleted!", { duration: 1500, position: "top-center" });
    sendEvent({ type: "DELETE_POST", id });
  };

  return (
    <WebSocketContext.Provider value={{ posts, addPost, likePost, addComment, deletePost, sendEvent, topRef }}>
      <div ref={topRef}></div>
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocket() {
  return useContext(WebSocketContext);
}
