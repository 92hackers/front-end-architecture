// server to static files.

var fs = require("fs");
var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");
var qiniu = require("qiniu");
var app = express();

qiniu.conf.ACCESS_KEY = 'VzTkJ8dE6yMTDgXqZkdnnXBjtU8eXS8DN3kQZl0w';
qiniu.conf.SECRET_KEY = 'XcoEaRHUPW0XMhXpF73xtPRh9BRL1y3aeg94OD9u';



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "5mb" }));
app.use("/js", express.static(__dirname + "/build/js"));
app.use("/css", express.static(__dirname + "/public"));

app.set("env", "development");

app.get("/", (req, res) => {
	return res.sendFile(__dirname + "/index.html");
});

app.get("/sign_in", (req, res) => {
 // add sign in code here.
 return res.sendFile(__dirname + "/index.html");
});

app.get("/sign_up", (req, res) => {
  // sign up code here.
 return res.sendFile(__dirname + "/index.html");
});

app.use("/upload-to-qiniu", (req, res) => {

	var bucket = 'com-weteach-avatar';
	// var key = req.headers.authorization + "-avatar.png";

	function uptoken(bucket) {
		var putPolicy = new qiniu.rs.PutPolicy(bucket);
		return putPolicy.token();
	}
	var token = uptoken(bucket);

	res.json({
		"uptoken": token
	});
});

app.get("/child_info", (req, res) => {
  return res.sendFile(__dirname + "/index.html");
})

app.post("/child_info", (req, res) => {
  //  child info creat here.
  res.end("post data successfully");
});

app.get("/parent_home", (req, res) => {
  return res.sendFile(__dirname + "/index.html");
});

var port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log("server listening on port: " + port);
});
