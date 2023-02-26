import { createContext, ReactNode, useContext } from "react";
import { io, Socket } from "socket.io-client";

interface ISocketContext {
  socket: Socket;
}

const SocketContext = createContext<ISocketContext | null>(null);

export const socket = io("wss://wrongway-racer-api.spls.ae/", {
  reconnectionDelayMax: 10000,
});

socket.onAny((n, m) => {
  console.log(n, m);
});

export function SocketProvider({ children }: { children: ReactNode }) {
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext) as ISocketContext;
}
