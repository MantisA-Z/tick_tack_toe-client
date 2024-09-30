import { useContext, createContext, useMemo } from "react";
import { io } from "socket.io-client";

const socketContext = createContext(null);

const useSocketContext = () => useContext(socketContext);

const SocketProvider = ({ children }) => {
  const socket = useMemo(() => {
    return io(process.env.REACT_APP_SERVER_URL);
  }, []);
  return (
    <socketContext.Provider value={socket}>{children}</socketContext.Provider>
  );
};

export { useSocketContext, SocketProvider };
