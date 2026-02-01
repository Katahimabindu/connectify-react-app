import React from "react";
import ReactDOM from "react-dom/client";
import { WebSocketProvider } from "./Context/WebSocketContext";
import App from "./App";
import { Toaster } from "react-hot-toast";
import "./styles.css";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <WebSocketProvider>
    <App />
    <Toaster position="top-center" />
  </WebSocketProvider>
);
