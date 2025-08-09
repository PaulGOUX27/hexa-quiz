import { WebSocket } from "ws";
import { Response } from "./types";

export class Communicator {
	private _mainScreenWs: WebSocket | null = null;

	set mainScreenWs(value: WebSocket | null) {
		this._mainScreenWs = value;
	}

	public sendToMainScreen(message: Response) {
		if (!this._mainScreenWs) {
			console.error(
				"No main screen WebSocket set in communicator, no message sent",
			);
		}
		this._mainScreenWs.send(JSON.stringify(message));
	}
}
