import Home from "./Pages/Home";
import { WebSocketProvider } from "./Context/WebSocketContext";

function App() {
  return (
    <WebSocketProvider>
      <Home />
    </WebSocketProvider>
  );
}

export default App;