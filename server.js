// server to static files.

var fs = require("fs");
var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "5mb" }));
app.use("/js", express.static(__dirname + "/build/js"));
app.use("/css", express.static(__dirname + "/public"));

app.set("env", "development");

app.get("/", (req, res) => {
	return res.sendFile(__dirname + "/index.html");
});

var port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log("server listening on port: " + port);
});
