import { Context } from "moleculer";
import { BuzParams, ResetParams, Team } from "./types";

let actualTeam: Team | null = null;

export default {
	name: "buzzer",
	version: 1,

	settings: {
		rest: "/buzzer",
	},

	actions: {
		buz: {
			visibility: "published",
			rest: "POST /buz",
			async handler(ctx: Context<BuzParams>) {
				if (actualTeam) {
					return;
				}

				actualTeam = ctx.params.team;
			},
		},

		reset: {
			visibility: "published",
			rest: "POST /reset",
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			async handler(ctx: Context<ResetParams>) {
				actualTeam = null;
			},
		},
	},
};
