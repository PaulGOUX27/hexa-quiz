import { useEffect, useState } from "react";
import { useWebSocket } from "../contexts/web-socket.ts";
import { Scores } from "../components/scores.tsx";
import { QrCodes } from "../components/qr-codes.tsx";
import { useKeyboardListener } from "../hooks/keyboard-listener.tsx";
import { SoundContextProvider } from "../contexts/sound-context-provider.tsx";
import { AdminContextProvider } from "../contexts/admin-context-provider.tsx";
import { ScoreContextProvider } from "../contexts/score-context-provider.tsx";

export function Home() {
  const { send } = useWebSocket();
  const [mode, setMode] = useState<"scores" | "qrcodes">("qrcodes");

  useEffect(() => {
    send({ type: "registerMainScreen" });
  }, [send]);

  useKeyboardListener("m", () => {
    setMode((m) => {
      if (m === "scores") {
        return "qrcodes";
      }
      return "scores";
    });
  });

  return (
    <SoundContextProvider>
      <AdminContextProvider>
        <ScoreContextProvider>
          {mode === "scores" ? <Scores /> : <QrCodes />}
        </ScoreContextProvider>
      </AdminContextProvider>
    </SoundContextProvider>
  );
}
