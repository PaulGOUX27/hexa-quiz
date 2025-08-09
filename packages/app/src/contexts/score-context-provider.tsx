import { type PropsWithChildren, useEffect, useState } from "react";
import { useWebSocket } from "./web-socket.ts";
import { ScoreContext } from "./score-context.ts";
import type { BuzResponse, ScoreResponse, TeamEnum } from "api/src/types.ts";

export function ScoreContextProvider({ children }: PropsWithChildren) {
  const { addListener } = useWebSocket();

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

  return (
    <ScoreContext.Provider value={{ redScore, blueScore, actualTeam }}>
      {children}
    </ScoreContext.Provider>
  );
}
