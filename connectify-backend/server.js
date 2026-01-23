const express = require("express");
const cors = require("cors");
const WebSocket = require("ws");

const app = express();
app.use(cors());
app.use(express.json());

let posts = [];

const server = app.listen(5000, () => {
  console.log("HTTP running on 5000");
});

const wss = new WebSocket.Server({ port: 8080 }, () => {
  console.log("WS running on 8080");
});

wss.on("connection", (ws) => {
  ws.send(JSON.stringify({ type: "INIT_POSTS", posts }));

  ws.on("message", (msg) => {
    const data = JSON.parse(msg);

    switch (data.type) {
      case "NEW_POST": {
        const post = {
          id: Date.now(),
          name: data.name,
          content: data.content,
          likes: [],
          comments: []
        };
        posts.unshift(post);
        broadcast({ type: "NEW_POST", post });
        break;
      }

      case "LIKE_POST": {
        posts = posts.map(p => {
          if (p.id === data.id) {
            const liked = p.likes.includes(data.userId);
            return {
              ...p,
              likes: liked
                ? p.likes.filter(u => u !== data.userId)
                : [...p.likes, data.userId]
            };
          }
          return p;
        });
        broadcast({ type: "UPDATE_POSTS", posts });
        break;
      }

      case "ADD_COMMENT": {
        posts = posts.map(p => {
          if (p.id === data.postId) {
            return {
              ...p,
              comments: [
                ...p.comments,
                { id: Date.now(), name: data.name, content: data.content }
              ]
            };
          }
          return p;
        });
        broadcast({ type: "UPDATE_POSTS", posts });
        break;
      }

      case "DELETE_POST": {
        posts = posts.filter(p => p.id !== data.id);
        broadcast({ type: "UPDATE_POSTS", posts });
        break;
      }
    }
  });
});

function broadcast(msg) {
  wss.clients.forEach(c => {
    if (c.readyState === WebSocket.OPEN) {
      c.send(JSON.stringify(msg));
    }
  });
}
