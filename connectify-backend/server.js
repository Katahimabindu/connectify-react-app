// console.log("this server is running")
const express = require("express");
const cors = require("cors");
const WebSocket = require("ws");
const http=require("http")

const app = express();
app.use(cors());
app.use(express.json());

// ------------------
// DATA STORE
// ------------------
let posts = [];
let following = [];

// ------------------
// HTTP SERVER
// ------------------
const server=http.createServer(app);
server.listen(5000, () => {
  console.log("🟢 HTTP server running on 5000");
});

// ------------------
// WEBSOCKET SERVER
// ------------------
const wss = new WebSocket.Server({ server });

// wss.on("listening", () => {
  console.log("🟢 WebSocket attached to http server");
// });

wss.on("connection", (ws) => {
  console.log("🔵 Client connected");

  // Send initial data
  ws.send(JSON.stringify({ type: "INIT_POSTS", posts }));
  ws.send(JSON.stringify({ type: "FOLLOW_UPDATE", following }));

  ws.on("message", (msg) => {
    const data = JSON.parse(msg);
    console.log("📩 received:", data);

    switch (data.type) {
      case "NEW_POST":
        posts.unshift({
          ...data.post,
          likes: 0,
          comments: [],
        });
        broadcast({ type: "UPDATE_POSTS", posts });
        break;

      case "LIKE_POST":
        posts = posts.map((p) => p.id === data.id
            ? { ...p, likes: (p.likes || 0) + 1 }
            : p
        );
        broadcast({ type: "UPDATE_POSTS", posts });
        break;

      case "ADD_COMMENT":
        posts = posts.map((p) =>
          p.id === data.id
            ? {
                ...p,
                comments: [
                  ...p.comments,
                  { id: Date.now(), name: data.name, content: data.content },
                ],
              }
            : p
        );
        broadcast({ type: "UPDATE_POSTS", posts });
        break;

      case "DELETE_POST":
        posts = posts.filter((p) => p.id !== data.id);
        broadcast({ type: "UPDATE_POSTS", posts });
        break;

      case "FOLLOW_USER":
        if (!following.includes(data.user)) {
          following.push(data.user);
        }
        broadcast({ type: "FOLLOW_UPDATE", following });
        break;
    }
  });

  ws.on("close", () => console.log("🔴 Client disconnected"));
});

function broadcast(msg) {
  const data = JSON.stringify(msg);
  wss.clients.forEach((c) => {
    if (c.readyState === WebSocket.OPEN) {
      c.send(data);
    }
  });
}
