// server static files.

var fs = require("fs");
var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");
var compression = require("compression");
var app = express();

// CORS.
app.all("*", (req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(compression());
app.use(bodyParser.urlencoded({ limit: "1000mb", extended: true }));
app.use(bodyParser.json({ limit: "1000mb" }));
app.use("/js", express.static(__dirname + "/build/js"));
app.use("/css", express.static(__dirname + "/build/css"));
app.use("/images", express.static(__dirname + "/build/images"));
app.use("/fonts", express.static(__dirname + "/build/fonts"));
app.set("env", process.env.NODE_ENV);

app.get("*", (req, res) => {
	return res.sendFile(__dirname + "/build/index.html");
});

var port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log("server listening on port: " + port);
});
