import { useEffect, useState } from "react";
import "./home.css";
import { useWebSocket } from "../contexts/web-socket.ts";
import { Scores } from "../components/scores.tsx";
import { QrCodes } from "../components/qr-codes.tsx";
import { useKeyboardListener } from "../hooks/keyboard-listener.tsx";

export function Home() {
  const { send } = useWebSocket();
  const [mode, setMode] = useState<"scores" | "qrcodes">("qrcodes");

  useEffect(() => {
    send({ type: "registerAdmin" });
  }, [send]);

  useKeyboardListener("m", () => {
    setMode((m) => {
      if (m === "scores") {
        return "qrcodes";
      }
      return "scores";
    });
  });

  return mode === "scores" ? <Scores /> : <QrCodes />;
}
