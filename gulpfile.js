var fs = require("fs");
var gulp = require("gulp");
var del = require("del");
var gulpUtil = require("gulp-util");
var config = require("config");
var webpack = require("webpack");
var runSequence = require("run-sequence");
var gulpif = require('gulp-if');
var sprity = require('sprity');

var env = process.env.NODE_ENV;

gulp.task("clean", () => {
    console.log("haha");
	del(["build"]);
});

gulp.task('sprites', function () {
  return sprity.src({
    src: './app/sprites-source/*.{png,jpg}',
    style: './sprite.css',
    margin: 0,
    cssPath: "/images"        //   url path in css file.
  })
  .pipe(gulpif('*.png', gulp.dest('./app/sprites/images/'), gulp.dest('./app/sprites/css/')))
});

gulp.task("webpack-dev", () => {
  var webpackDevServer = require("webpack-dev-server");
  var webpackDev = require("./packing/webpack-dev");

  webpackDev.entry.unshift("webpack-dev-server/client?http://localhost:3001/");

  var webpackServerOptions = {
    publicPath: '/',
    contentBase: '/',
    historyApiFallback: false,
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
    var assets = JSON.stringify(stats.toJson().assetsByChunkName);
    fs.writeFileSync("build/assets.json",assets);
		gulpUtil.log("[webpack]", stats.toString());
	});
});

gulp.task("dev", () => {
  runSequence("clean", "webpack-dev", (err) => {
    if (err) {
      throw new gulpUtil.PluginError("gulp dev", err);
    }
  });
});

gulp.task("build", () => {
	runSequence("clean", "sprites", "webpack-build", (err) => {
		if (err) {
			console.log(err);
		} else {
			console.log("build successfully.");
		}
	});
});
