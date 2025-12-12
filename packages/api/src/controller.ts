import { MessageSchema } from "./types";
import { Party } from "./party";
import { WebSocket } from "ws";
import { Communicator } from "./communicator";

export class Controller {
	constructor(
		private party: Party,
		private communicator: Communicator,
	) {}

	public handleMessage(message: unknown, { ws }: { ws: WebSocket }) {
		const parsedData = MessageSchema.safeParse(message);
		if (parsedData.error) {
			console.warn("Unknown message", message);
			return;
		}
		try {
			console.log(parsedData.data.type + " event received");
			switch (parsedData.data.type) {
				case "buz":
					if (this.party.buz(parsedData.data.team)) {
						// Play sound
						this.communicator.sendToMainScreen({
							type: "buzResponse",
							team: parsedData.data.team,
						});
					}
					break;
				case "score": {
					const value = this.party.score(
						parsedData.data.team,
						parsedData.data.value,
					);
					this.communicator.sendToMainScreen({
						type: "scoreResponse",
						team: parsedData.data.team,
						value,
					});
					break;
				}
				case "resetBuzzer":
					this.communicator.sendToMainScreen({
						type: "buzResponse",
						team: this.party.resetBuzzer(),
					});
					break;
				case "registerMainScreen":
					this.communicator.mainScreenWs = ws;
					break;
				case "song:pause":
				case "song:play":
				case "song:resume":
				case "song:stop":
					this.communicator.sendToMainScreen(parsedData.data);
					break;
				default:
					console.warn("Unknown message type", parsedData.data);
			}
		} catch (e) {
			console.error((e as Error).message, message);
		}
	}
}
