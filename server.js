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

app.get("/sign_in", (req, res) => {
 // add sign in code here.
 return res.sendFile(__dirname + "/sign_in.html");
});

app.get("/sign_up", (req, res) => {
  // sign up code here.
 return res.sendFile(__dirname + "/sign_up.html");
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
