import "./App.css";
import { WebSocketContextProvider } from "./contexts/web-socket-provider.tsx";
import { Routes } from "./routes.tsx";

function App() {
  return (
    <WebSocketContextProvider>
      <Routes />
    </WebSocketContextProvider>
  );
}

export default App;
