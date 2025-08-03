import { useEffect, useState } from "react";
import "./home.css";
import { useWebSocket } from "../../contexts/web-socket.ts";
import type { BuzResponse, ScoreResponse, TeamEnum } from "api/src/types.ts";

/* TODO
      Add a mode to switch between score and QRcode
 */
export function Home() {
  const [redScore, setRedScore] = useState(0);
  const [blueScore, setBlueScore] = useState(0);
  const [actualTeam, setActualTeam] = useState<TeamEnum | null>(null);
  const { send, addListener } = useWebSocket();

  useEffect(() => {
    send({ type: "registerAdmin" });
  }, [send]);

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

  return (
    <div className="score-panel-root">
      <div
        className={`score-panel ${actualTeam === "red" && "score-panel-red"}`}
      >
        <span className="score">{redScore}</span>
      </div>

      <div
        className={`score-panel ${actualTeam === "blue" && "score-panel-blue"}`}
      >
        <span className="score">{blueScore}</span>
      </div>
    </div>
  );
}
