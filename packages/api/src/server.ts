import { WebSocketServer } from "ws";
import { Party } from "./party";
import { Controller } from "./controller";
import { Communicator } from "./communicator";

const wss = new WebSocketServer({
	port: 8080,
});
const controller = new Controller(new Party(), new Communicator());

wss.on("connection", function connection(ws) {
	ws.on("error", console.error);

	ws.on("message", (data) => {
		controller.handleMessage(JSON.parse(data.toString()), { ws });
	});
});
