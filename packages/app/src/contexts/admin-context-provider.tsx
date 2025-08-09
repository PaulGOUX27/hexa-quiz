import { type PropsWithChildren } from "react";
import { useWebSocket } from "./web-socket.ts";
import { AdminContext } from "./admin-context.ts";
import { useKeyboardListener } from "../hooks/keyboard-listener.tsx";

export function AdminContextProvider({ children }: PropsWithChildren) {
  const { send } = useWebSocket();

  useKeyboardListener("r", () => send({ type: "resetBuzzer" }));
  useKeyboardListener("a", () =>
    send({ type: "score", team: "red", value: 1 }),
  );
  useKeyboardListener("q", () =>
    send({ type: "score", team: "red", value: -1 }),
  );
  useKeyboardListener("z", () =>
    send({ type: "score", team: "blue", value: 1 }),
  );
  useKeyboardListener("s", () =>
    send({ type: "score", team: "blue", value: -1 }),
  );

  return (
    <AdminContext.Provider value={undefined}>{children}</AdminContext.Provider>
  );
}
