// server to static files.

var fs = require("fs");
var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");
var qiniu = require("qiniu");
var app = express();
var Async = require("async");

qiniu.conf.ACCESS_KEY = 'VzTkJ8dE6yMTDgXqZkdnnXBjtU8eXS8DN3kQZl0w';
qiniu.conf.SECRET_KEY = 'XcoEaRHUPW0XMhXpF73xtPRh9BRL1y3aeg94OD9u';



app.use(bodyParser.urlencoded({ limit: "1000mb", extended: true }));
app.use(bodyParser.json({ limit: "1000mb" }));
app.use("/js", express.static(__dirname + "/build/js"));
app.use("/", express.static(__dirname + "/build/css"));
app.use("/imgs", express.static(__dirname + "/app/imgs"));
app.use("/fonts", express.static(__dirname + "/build/fonts"));
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

	// var wrappedQiniuIo = Async.wrapSync(qiniu.io, ["put"]);
	// console.log(wrappedQiniuIo());

	function uptoken(bucket) {
		var putPolicy = new qiniu.rs.PutPolicy(bucket);
		return putPolicy.token();
	}
	var token = uptoken(bucket);

	function uploadImgBuf (avatarBuf, callback) {
		var extra = new qiniu.io.PutExtra();
		extra.mimeType = "image/png";
		return qiniu.io.put(token, "", avatarBuf, extra, (err, ret) => {
			if (!err) {
				console.log(ret.key);
				var url = qiniu.rs.makeBaseUrl("http://oawkdrros.bkt.clouddn.com", ret.key);
				res.json({
					err: 0,
					data: url
				});
			} else {
				console.log(err);
			}
		});
		// return wrappedQiniuIo.put(token, "", avatarbuf, extra);
	}

	var avatarbuf = req.body.img;

	var buf = new Buffer(avatarbuf.replace(/^data:image\/\w+;base64,/, ""), "base64");

	uploadImgBuf(buf);
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
