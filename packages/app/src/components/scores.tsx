import { TeamBackground } from "./team-background.tsx";
import { useScore } from "../contexts/score-context.ts";

export function Scores() {
  const { blueScore, redScore, actualTeam } = useScore();

  return (
    <>
      <TeamBackground
        isBlueActive={actualTeam === "blue"}
        blueChildren={<span className="score">{blueScore}</span>}
        isRedActive={actualTeam === "red"}
        redChildren={<span className="score">{redScore}</span>}
      />
    </>
  );
}
