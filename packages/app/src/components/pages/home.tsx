import { useEffect, useState } from "react";
import "./home.css";
import { useWebSocket } from "../../contexts/web-socket.ts";
import type { ScoreResponse } from "api/src/types.ts";

/* TODO
      Add a mode to switch between score and QRcode
 */
export function Home() {
  const [redScore, setRedScore] = useState(0);
  const [blueScore, setBlueScore] = useState(0);
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

  return (
    <div className="score-panel-root">
      <div className="score-panel score-panel-red">
        <span className="score">{redScore}</span>
      </div>

      <div className="score-panel score-panel-blue">
        <span className="score">{blueScore}</span>
      </div>
    </div>
  );
}
