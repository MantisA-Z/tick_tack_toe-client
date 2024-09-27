import { useContext, createContext, useMemo } from "react";
import { io } from "socket.io-client";

const socketContext = createContext(null);

export const useSocketContext = () => useContext(socketContext);

export const SocketProvider = ({ children }) => {
  const socket = useMemo(() => {
    return io("http://127.0.0.1:8000");
  }, []);
  return (
    <socketContext.Provider value={socket}>{children}</socketContext.Provider>
  );
};
