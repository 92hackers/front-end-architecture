import fs from 'fs'
import del from 'del'
import config from 'config'
import webpack from 'webpack'
import runSequence from 'run-sequence'
import gulp from 'gulp'
import gulpif from 'gulp-if'
import gulpUtil from 'gulp-util'
import eslint from 'gulp-eslint'
import styleLint from 'gulp-stylelint'

gulp.task('clean', () => {
  gulpUtil.log('cleaning...')
  del(['build', 'builg.tar.gz'])
})

gulp.task('jslint', () => gulp.src(['app/*.js', 'app/*.jsx', 'app/**/*.js', 'app/**/*.jsx', '!app/styles/**'])
  .pipe(eslint('.eslintrc.js'))
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
)

gulp.task('csslint', () => gulp.src(['app/*.less', 'app/styles/*.less'])
  .pipe(styleLint({
    failAfterError: true,
    reporters: [
      { formatter: 'verbose', console: true },
    ],
  }))
)

gulp.task('sprites', () => {
  const sprity = require('sprity');
  return sprity.src({
    src: './app/sprites-source/*.{png,jpg}',
    style: './sprite.css',
    engine: "lwip",
    margin: 0,
    cssPath: "/images"        //   url path in css file.
  })
  .pipe(gulpif('*.png', gulp.dest('./app/sprites/images/'), gulp.dest('./app/sprites/css/')))
});

gulp.task("webpack-dev", () => {
  gulpUtil.log("\n");
  gulpUtil.log("If you has add images, you should exec 'gulp sprites' first. ");
  gulpUtil.log("\n");

  var webpackDevServer = require("webpack-dev-server");
  var webpackDev = require("./packing/webpack-dev");

  webpackDev.entry.unshift("webpack-dev-server/client?http://localhost:3001/");

  var webpackServerOptions = {
    publicPath: '/',
    contentBase: '/',
    historyApiFallback: false,
    hot: true,
    proxy: {
      "**": "http://localhost:3000"
    },
    historyApiFallback: true,
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
  gulpUtil.log("\n");
  gulpUtil.log("If you has add images, you should exec 'gulp sprites' first. ");
  gulpUtil.log("\n");
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

gulp.task('lint', () => {
  runSequence('jslint', 'csslint', (err) => {
    if (err) {
      throw new gulpUtil.PluginError('gulp lint', err)
    }
  })
})

gulp.task("build", () => {
	runSequence("clean", "webpack-build", (err) => {
		if (err) {
      gulpUtil.log("error: ", err);
		} else {
      gulpUtil.log(new Date(), "build successfully");
		}
	});
});