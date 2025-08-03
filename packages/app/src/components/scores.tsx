import { useEffect, useState } from "react";
import { useWebSocket } from "../contexts/web-socket.ts";
import type { BuzResponse, ScoreResponse, TeamEnum } from "api/src/types.ts";
import { useKeyboardListener } from "../hooks/keyboard-listener.tsx";
import { TeamBackground } from "./team-background.tsx";

export function Scores() {
  const { send, addListener } = useWebSocket();

  const [redScore, setRedScore] = useState(0);
  const [blueScore, setBlueScore] = useState(0);
  const [actualTeam, setActualTeam] = useState<TeamEnum | null>(null);

  useEffect(() => {
    return addListener("scoreResponse", (response: ScoreResponse) => {
      if (response.team === "red") {
        setRedScore(response.value);
      } else if (response.team === "blue") {
        setBlueScore(response.value);
      }
    });
  }, [addListener]);

  useEffect(() => {
    return addListener("buzResponse", (response: BuzResponse) => {
      setActualTeam(response.team);
    });
  }, [addListener]);

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
    <TeamBackground
      isBlueActive={actualTeam === "blue"}
      blueChildren={<span className="score">{blueScore}</span>}
      isRedActive={actualTeam === "red"}
      redChildren={<span className="score">{redScore}</span>}
    />
  );
}
