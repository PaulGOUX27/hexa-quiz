import { createContext, useContext } from "react";
import type { TeamEnum } from "api/src/types.ts";

export type ScoreContext = {
  redScore: number;
  blueScore: number;
  actualTeam: TeamEnum | null;
};

export const ScoreContext = createContext<ScoreContext>(undefined!);

export const useScore = (): ScoreContext => {
  return useContext(ScoreContext);
};
