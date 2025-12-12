import { WebSocket } from "ws";
import { Response } from "./types";

export class Communicator {
	private _mainScreenWs: WebSocket | null = null;
	private webSockets: WebSocket[] = [];

	set mainScreenWs(webSocket: WebSocket | null) {
		this._mainScreenWs = webSocket;
	}

	registerWebSocket(webSocket: WebSocket) {
		this.webSockets.push(webSocket);
	}

	public sendToMainScreen(message: Response) {
		if (!this._mainScreenWs) {
			console.error(
				"No main screen WebSocket set in communicator, no message sent",
			);
		}
		this._mainScreenWs.send(JSON.stringify(message));
	}

	public broadcast(message: Response) {
		const messageStr = JSON.stringify(message);
		this.webSockets.forEach((ws) => {
			ws.send(messageStr);
		});
	}
}
