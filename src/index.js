import React from "react";
import ReactDOM from "react-dom/client";
import { WebSocketProvider } from "./Context/WebSocketContext";
import Home from "./Pages/Home";
import { Toaster } from "react-hot-toast";
import "./index.css"; // your tailwind or global styles

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <WebSocketProvider>
    <Home />
    <Toaster position="top-center" />
  </WebSocketProvider>
);
