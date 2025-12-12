import "./buzzer.css";
import { getRouteApi } from "@tanstack/react-router";
import { useWebSocket } from "../contexts/web-socket.ts";
import { ScoreContextProvider } from "../contexts/score-context-provider.tsx";
import { useScore } from "../contexts/score-context.ts";

const route = getRouteApi("/buzzer");

function BuzzerInternal() {
  const { team } = route.useSearch();
  const { send } = useWebSocket();
  const { blueScore, redScore } = useScore();

  return (
    <div className="buzzer-wrapper">
      <div className="score-container">
        <span className="score red-score">{redScore}</span>
        <span className="score blue-score">{blueScore}</span>
      </div>
      <button
        className={`buzzer ${team}`}
        onClick={() => send({ type: "buz", team })}
      >
        <div />
      </button>
      <div />
    </div>
  );
}

export function Buzzer() {
  return (
    <ScoreContextProvider>
      <BuzzerInternal />
    </ScoreContextProvider>
  );
}
