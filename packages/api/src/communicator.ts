import { WebSocket } from "ws";
import { Response } from "./types";

export class Communicator {
	private _adminWs: WebSocket | null = null;

	set adminWs(value: WebSocket | null) {
		this._adminWs = value;
	}

	public sendToAdmin(message: Response) {
		if (!this._adminWs) {
			console.error(
				"No admin WebSocket set in communicator, no message sent",
			);
		}
		this._adminWs.send(JSON.stringify(message));
	}
}
