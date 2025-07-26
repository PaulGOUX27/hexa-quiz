import {Server} from "socket.io";

export default {
	name: "ws",
	version: 1,

	settings: {
		rest: "/ws"
	},

	methods: {
		getEmitter() {
			return this.ioEmitter;
		},
	},

	actions: {
		test: {
			visibility: "published",
			rest: "GET /test",
			handler() {
				console.log('handler ws service')
			}
		}
	},

	started() {
		// Create a Socket.IO instance, passing it our server
		this.io = new Server(this.server);

		console.log("WS started")

		// Add a connect listener
		this.io.on("connection", client => {
			this.logger.info("Client connected via websocket!");

			client.on("call", ({ action, params, opts }, done) => {
				this.logger.info("Received request from client! Action:", action, ", Params:", params);

				this.broker.call(action, params, opts)
					.then(res => {
						if (done)
							done(res);
					})
					.catch(err => this.logger.error(err));
			});

			client.on("disconnect", () => {
				this.logger.info("Client disconnected");
			});

		});
	},
}
