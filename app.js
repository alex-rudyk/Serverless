const express = require("express");
const serverless = require("serverless-http");
const router = require('./routers');
const app = express();

app.use(express.json());
app.use(router);

app.use((req, res, next) => {
	return res.status(404).json({
		error: "Not Found",
	});
});


module.exports.handler = serverless(app);
