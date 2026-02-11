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
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🟢 HTTP server running on ${PORT}`);
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
    console.log("RAW MESSAGE:",msg.toString());
    const data = JSON.parse(msg);
    console.log("📩 received:", data);

    switch (data.type) {
      case "NEW_POST":
        posts.unshift({
          ...data.post,
          likes: 0,
          comments: [],
          likedBy:[],
        });
        broadcast({ type: "UPDATE_POSTS", posts });
        break;

      // case "LIKE_POST":

      case "LIKE_POST": {
  const { id, user } = data;

  posts = posts.map((p) => {
    if (p.id !== id) return p;

    const likedBy = p.likedBy || [];

    if (likedBy.includes(user)) {
      // UNLIKE
      return {
        ...p,
        likes: Math.max((p.likes || 1) - 1, 0),
        likedBy: likedBy.filter((u) => u !== user),
      };
    } else {
      // LIKE
      return {
        ...p,
        likes: (p.likes || 0) + 1,
        likedBy: [...likedBy, user],
      };
    }
  });

  broadcast({ type: "UPDATE_POSTS", posts });
  break;
}

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