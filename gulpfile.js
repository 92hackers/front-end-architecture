var fs = require("fs");
var gulp = require("gulp");
var del = require("del");
var gulpUtil = require("gulp-util");
var config = require("config");
var webpack = require("webpack");
var runSequence = require("run-sequence");


var env = process.env.NODE_ENV;

gulp.task("clean", () => {
    console.log("haha");
	del(["build"]);
});

gulp.task("webpack-dev", () => {
  var webpackDevServer = require("webpack-dev-server");
  var webpackDev = require("./packing/webpack-dev");

  var webpackServerOptions = {
    publicPath: '/',
    hot: true,
    stats: {
      colos: true
    },
    compress: true
  };
  
  var devServer = new webpackDevServer(webpack(webpackDev), webpackServerOptions);

  devServer.listen(config.devPort, "localhost", (err) => {
    if (err) {
      throw new gulpUtil.PluginError("webpack-dev-server", err);
    }
    gulpUtil.log("[webpack-dev-server] is listening on Port: " + config.devPort );
  });
});

gulp.task("webpack-build", () => {
  var webpackBuild = require("./packing/webpack-build");
	webpack(webpackBuild, (err, stats) => {
		if (err)
			throw new gulpUtil.PluginError("webpack", err);
		gulpUtil.log("[webpack]", stats.toString())
	});
});

gulp.task("html", () => {
	console.log("render html, here.");
	// render html.
});

gulp.task("dev", () => {
  runSequence("clean", "webpack-dev", "html", (err) => {
    if (err) {
      throw new gulpUtil.PluginError("gulp dev", err);
    }
  });
});

gulp.task("build", () => {
	runSequence("clean", "webpack-build", "html", (err) => {
		if (err) {
			console.log(err);
		} else {
			console.log("build successfully.");
		}
	});
});
