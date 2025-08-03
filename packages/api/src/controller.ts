import { MessageSchema } from "./types";
import { Party } from "./party";
import { WebSocket } from "ws";
import { Communicator } from "./communicator";

export class Controller {
	private adminWs: WebSocket | null = null;
	constructor(
		private party: Party,
		private communicator: Communicator,
	) {}

	private assertIsAdmin(ws: WebSocket) {
		if (this.adminWs !== ws) {
			throw new Error("Not the admin");
		}
	}

	public handleMessage(message: unknown, { ws }: { ws: WebSocket }) {
		const parsedData = MessageSchema.safeParse(message);
		if (parsedData.error) {
			console.warn("Unknown message", message);
			return;
		}
		try {
			switch (parsedData.data.type) {
				case "buz":
					if (this.party.buz(parsedData.data.team)) {
						// Play sound
						this.communicator.sendToAdmin({
							type: "buzResponse",
							team: parsedData.data.team,
						});
					}
					break;
				case "score": {
					this.assertIsAdmin(ws);
					const value = this.party.score(
						parsedData.data.team,
						parsedData.data.value,
					);
					this.communicator.sendToAdmin({
						type: "scoreResponse",
						team: parsedData.data.team,
						value,
					});
					break;
				}
				case "resetBuzzer":
					this.assertIsAdmin(ws);
					this.communicator.sendToAdmin({
						type: "buzResponse",
						team: this.party.resetBuzzer(),
					});
					break;
				case "registerAdmin":
					if (!this.adminWs) {
						this.adminWs = ws;
						this.communicator.adminWs = ws;
					}
					break;
				default:
					console.warn("Unknown message type", parsedData.data);
			}
		} catch (e) {
			console.error((e as Error).message, message);
		}
	}
}
