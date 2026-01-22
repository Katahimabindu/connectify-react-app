// server.js
const express = require("express");
const cors = require("cors");
const WebSocket = require("ws");

const app = express();
app.use(cors());
app.use(express.json());

let posts = []; // Store posts in-memory

// REST API (optional, for initial load or debugging)
app.get("/posts", (req, res) => {
  res.json(posts);
});

// Create post via HTTP (optional)
app.post("/createpost", (req, res) => {
  const { name, content } = req.body;
  const newPost = {
    id: Date.now(),
    name,
    content,
    likes: 0,
    liked: false,
    comments: [],
  };
  posts.unshift(newPost);
  res.json(newPost);
  broadcast({ type: "NEW_POST", post: newPost });
});

// Start Express server
const server = app.listen(5000, () => {
  console.log("Backend API running on port 5000...");
});

// Start WebSocket server
const wss = new WebSocket.Server({ port: 8080 }, () => {
  console.log("WebSocket server running on port 8080...");
});

wss.on("connection", (ws) => {
  console.log("Client connected");

  // Send current posts on connect
  ws.send(JSON.stringify({ type: "INIT_POSTS", posts }));

  ws.on("message", (message) => {
    try {
      const data = JSON.parse(message);

      switch (data.type) {
        case "NEW_POST":
          posts.unshift(data.post);
          broadcast({ type: "NEW_POST", post: data.post });
          break;

        case "LIKE_POST":
          posts = posts.map(p => {
            if (p.id === data.id) {
              const updatedLikes = p.liked ? p.likes - 1 : p.likes + 1;
              return { ...p, likes: updatedLikes, liked: !p.liked };
            }
            return p;
          });
          broadcast({ type: "UPDATE_POSTS", posts });
          break;

        case "ADD_COMMENT":
          posts = posts.map(p => {
            if (p.id === data.id) {
              const newComment = { id: Date.now(), name: data.name, content: data.content };
              return { ...p, comments: [...p.comments, newComment] };
            }
            return p;
          });
          broadcast({ type: "UPDATE_POSTS", posts });
          break;

        case "DELETE_POST":
          posts = posts.filter(p => p.id !== data.id);
          broadcast({ type: "UPDATE_POSTS", posts });
          break;
      }

    } catch (err) {
      console.log("Invalid message:", err.message);
    }
  });

  ws.on("close", () => console.log("Client disconnected"));
});

// Broadcast to all connected clients
function broadcast(msg) {
  const data = JSON.stringify(msg);
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}