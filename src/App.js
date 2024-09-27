import "./App.css";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SocketProvider } from "./contexts/socketContext";
import Error from "./components/Error";

function App() {
  return (
    <SocketProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/error" element={<Error />}></Route>
        </Routes>
      </Router>
    </SocketProvider>
  );
}

export default App;
