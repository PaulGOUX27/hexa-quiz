import {
  createContext,
  type PropsWithChildren,
  useContext,
  useMemo,
  useRef,
} from "react";

export type WebSocketContext = {
  send: () => void; // TODO
};

const WebSocketContext = createContext<WebSocketContext>(undefined!);

export function WebSocketContextProvider({ children }: PropsWithChildren) {
  const ws = useRef(new WebSocket("ws://localhost:8080"));

  const value = useMemo(
    () => ({
      send: () => {
        // TODO
      },
    }),
    [],
  );

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
}

export const useWebSocketContext = (): WebSocketContext => {
  return useContext(WebSocketContext);
};
