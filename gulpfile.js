var fs = require("fs");
var gulp = require("gulp");
var del = require("del");
var gulpUtil = require("gulp-util");
var config = require("config");
var webpack = require("webpack");
var runSequence = require("run-sequence");
var webpackDevServer = require("webpack-dev-server");
var webpackBuild = require("./packing/webpack-build");


var env = process.env.NODE_ENV;

gulp.task("clean", () => {
    console.log("haha");
	del("./build");
});

gulp.task("webpack-build", () => {
	webpack(webpackBuild, (err, stats) => {
		if (err)
			throw new gulpUtil.PluginError("webpack", err);
		gulpUtil.log("[webpack]", stats.toString())
	})
});

gulp.task("html", () => {
	console.log("render html, here.");
	// render html.
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
