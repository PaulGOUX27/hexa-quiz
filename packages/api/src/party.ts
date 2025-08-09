import { Team, TeamEnum } from "./types";
import { fromEntries } from "./utils";

export class Party {
	private actualTeam: TeamEnum | null = null;
	private scores: Record<TeamEnum, number>;

	constructor() {
		this.scores = fromEntries(Team.map((t) => [t, 0]));
	}

	public buz(team: TeamEnum): boolean {
		if (!this.actualTeam) {
			console.log("Buz", { team });
			this.actualTeam = team;
			return true;
		}
		return false;
	}

	public resetBuzzer(): null {
		console.log("Reset buzzer");
		this.actualTeam = null;
		return null;
	}

	public score(team: TeamEnum, value: number): number {
		this.scores[team] += value;
		console.log("Score", { team, value, score: this.scores[team] });
		return this.scores[team];
	}
}
