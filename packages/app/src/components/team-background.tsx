import type { ReactNode } from "react";
import "./team-background.css";

export type TeamBackgroundProps = {
  isBlueActive: boolean;
  blueChildren: ReactNode;
  isRedActive: boolean;
  redChildren: ReactNode;
};

export function TeamBackground({
  isBlueActive,
  isRedActive,
  redChildren,
  blueChildren,
}: TeamBackgroundProps) {
  return (
    <div className="score-panel-root">
      <div className={`score-panel ${isRedActive && "score-panel-red"}`}>
        {redChildren}
        <span className={"team-name"}>
          {import.meta.env.VITE_RED_TEAM_NAME}
        </span>
      </div>
      <div className={`score-panel ${isBlueActive && "score-panel-blue"}`}>
        {blueChildren}
        <span className={"team-name"}>
          {import.meta.env.VITE_BLUE_TEAM_NAME}
        </span>
      </div>
    </div>
  );
}
