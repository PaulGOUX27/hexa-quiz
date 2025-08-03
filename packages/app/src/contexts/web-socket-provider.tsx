import {
  type PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import type { Message, Response } from "api/src/types.ts";
import { WebSocketContext } from "./web-socket.ts";

export function WebSocketContextProvider({ children }: PropsWithChildren) {
  const ws = useRef<WebSocket | null>(null);
  const listeners = useRef<
    Record<Response["type"], ((response: Response) => void)[]>
  >({ buzResponse: [], scoreResponse: [] });
  const pendingMessages = useRef<Message[]>([]);

  const send: WebSocketContext["send"] = useCallback((message: Message) => {
    if (ws.current?.readyState !== WebSocket.OPEN) {
      pendingMessages.current.push(message);
      return;
    }
    ws.current.send(JSON.stringify(message));
  }, []);

  const addListener: WebSocketContext["addListener"] = useCallback(
    <T extends Response["type"]>(
      type: T,
      listener: (response: Extract<Response, { type: T }>) => void,
    ): (() => void) => {
      // @ts-expect-error listeners is not perfectly typed as the key define the response type
      listeners.current[type].push(listener);
      return () => {
        const index = listeners.current[type].findIndex(() => listener);
        if (index < 0) {
          return;
        }
        listeners.current[type].splice(index, 1);
      };
    },
    [],
  );

  useEffect(() => {
    const _ws = new WebSocket("ws://localhost:8080");
    ws.current = _ws;

    const onOpen = () => {
      pendingMessages.current.forEach(send);
    };

    ws.current.addEventListener("open", onOpen);
    return () => {
      _ws.removeEventListener("open", onOpen);
      _ws.close();
    };
  }, [send]);

  useEffect(() => {
    if (!ws.current) {
      console.error("No WebSocket. Listener not set");
      return;
    }

    const onMessage = (message: MessageEvent<string>) => {
      const parsedMessage = JSON.parse(message.data) as Response;
      listeners.current[parsedMessage.type].forEach((callback) =>
        callback(parsedMessage),
      );
    };

    ws.current.addEventListener("message", onMessage);
    const _ws = ws.current;

    return () => {
      _ws.removeEventListener("message", onMessage);
    };
  }, []);

  const value = useMemo(
    () => ({
      send,
      addListener,
    }),
    [addListener, send],
  );

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
}
