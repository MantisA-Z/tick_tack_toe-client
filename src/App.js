import "./App.css";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SocketProvider } from "./contexts/socketContext";
import Error from "./components/Error";
import Room from "./components/Room";

function App() {
  return (
    <SocketProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/error/:msg" element={<Error />}></Route>
          <Route path="/room/:roomName" element={<Room />}></Route>
        </Routes>
      </Router>
    </SocketProvider>
  );
}

export default App;
