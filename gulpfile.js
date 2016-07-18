var fs = require("fs");
var gulp = require("gulp");
var del = require("del");
var gulpUtil = require("gulp-util");
var config = require("config");
var webpack = require("webpack");
var webpackDevServer = require("webpack-dev-server");


var env = process.env.NODE_ENV;

gulp.task("clean", () => {
	del("./build");
});

gulp.task("webpack-build", () => {
	var webpackBuild = require("./packing/webpack-build");
	webpack(webpackBuild, (err, stats) => {
		if (err)
			throw new gulpUtil.PluginError("webpack", err);
		gulpUtil.log("[webpack]", stats.toString())
	})
});
