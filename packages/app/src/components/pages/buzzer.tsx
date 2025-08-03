import "./buzzer.css";
import { getRouteApi } from "@tanstack/react-router";
import { useWebSocket } from "../../contexts/web-socket.ts";

const route = getRouteApi("/buzzer");

export function Buzzer() {
  const { team } = route.useSearch();
  const { send } = useWebSocket();

  return (
    <div className="buzzer-wrapper">
      <button
        className={`buzzer ${team}`}
        onClick={() => send({ type: "buz", team })}
      >
        <div />
      </button>
    </div>
  );
}
