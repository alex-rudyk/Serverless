const serverless = require("serverless-http");

/**
 * Create Express app.
 * @returns Express app
 */
const createApp = () => {
	const express = require("express");
	const router = require('./routers');
	const app = express();

	app.use(express.json());
	app.use(router);

	app.use((req, res, next) => {
		return res.status(404).json({
			error: "Not Found",
		});
	});

	return app;
}

module.exports.handler = serverless(createApp());
