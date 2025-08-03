import { createContext, useContext } from "react";
import type { Message, Response } from "api/src/types.ts";

export type WebSocketContext = {
  send: (message: Message) => void;
  addListener: <T extends Response["type"]>(
    type: T,
    listener: (response: Extract<Response, { type: T }>) => void,
  ) => () => void;
};

export const WebSocketContext = createContext<WebSocketContext>(undefined!);

export const useWebSocket = (): WebSocketContext => {
  return useContext(WebSocketContext);
};
