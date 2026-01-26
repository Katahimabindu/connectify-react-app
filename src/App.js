import { Toaster } from "react-hot-toast";
import Home from "./Pages/Home";
import { WebSocketProvider } from "./Context/WebSocketContext";

function App() {
  return (
    <WebSocketProvider>
      <Toaster position="top-right" />
      <Home />
    </WebSocketProvider>
  );
}

export default App;
