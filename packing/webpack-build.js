var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var config = require("config");
var autoPrefixer = require("autoprefixer");
var path = require("path");

//var imageName = "images/[name].[hash:8].[ext]";
//var fontName = "fonts/[name].[hash:8].[ext]";

var imageName = "images/[name].[ext]";
var fontName = "fonts/[name].[ext]";

var rootDir = path.join(__dirname, "..");

var main = path.join(rootDir, "app/entry");

var localTestEntry = path.join(rootDir, 'local-test/index');

var outputPath = path.join(rootDir, "build/");


module.exports = {
	// entry: [mainJsx, mainStyle],
    entry: main,
	output: {
        path: outputPath,
		//filename: "js/[name].[chunkhash:8].js"
		filename: "js/[name].js"
	},
	resolve: {
		extensions: ["", ".js", ".coffee", ".jsx", ".less", "css"]
	},
	module: {
		loaders: [
			{ test: /\.jsx$/, loader: "babel", query: { presets: ["es2015", "react"]}, exclude: /node_modules/ },
			{ test: /\.js$/, loader: "babel", query: { presets: ["es2015"] }, exclude: /node_modules/ },
			{ test: /\.coffee$/, loader: "coffee", exclude: /node_modules/ },
			{ test: /\.less$/, loader: ExtractTextPlugin.extract("style", "css!postcss!less") },
			{ test: /\.css$/, loader: ExtractTextPlugin.extract("style", "css!postcss") },
			{ test: /\.json$/, loader: "json"},
			//{ test: /\.(png|jpg|gif)$/,  loader: 'url',  query: {limit: 2048,  name: imageName} },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=imageName',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'

        ]
      },
			{ test: /\.woff(\?\S*)?$/,  loader: "url",  query: {limit: 100,  mimetype: 'application/font-woff',  name: fontName} },
			{ test: /\.woff2(\?\S*)?$/,  loader: "url",  query: {limit: 100,  mimetype: 'application/font-woff2',  name: fontName} },
			{ test: /\.ttf(\?\S*)?$/,  loader: "url",  query: {limit: 100,  mimetype: "application/octet-stream",  name: fontName} },
			{ test: /\.eot(\?\S*)?$/,  loader: "url",  query: {limit: 100,  name: fontName} },
			{ test: /\.svg(\?\S*)?$/,  loader: "url",  query: {limit: 10000,  mimetype: "image/svg+xml",  name: fontName} },
		]
	},
  plugins: process.env.NODE_ENV === 'production' ? [
		new ExtractTextPlugin("css/[name].css"),
		// new webpack.DefinePlugin({"process.env": { "NODE_ENV": JSON.stringify("development") }}),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
  ] : [
		new ExtractTextPlugin("css/[name].css"),
  ],
	postcss: () => {
		autoPrefixer({ browsers: ["last 2 versions", "> 1%"] })
	}
}
