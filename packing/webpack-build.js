var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var config = require("config");
var autoPrefixer = require("autoprefixer");

//var imageName = "images/[name].[hash:8].[ext]";
//var fontName = "fonts/[name].[hash:8].[ext]";

var imageName = "images/[name].[ext]";
var fontName = "fonts/[name].[ext]";

module.exports = {
	entry: {
		main: "../app/main"
	}, 
	output: {
		path: "build/",
		//filename: "js/[name].[chunkhash:8].js"
		filename: "js/[name].js"
	}, 
	resolve: {
		extentions: ["", ".js", ".coffee", ".jsx"]
	}, 
	module: {
		loaders: [
			{ test: /\.jsx$/, loader: "babel", query: { presets: ["es2015", "react"]}, exclude: /node_modules/ },
			{ test: /\.coffee$/, loader: "coffee", exclude: /node_modules/ },
			{ test: /\.less$/, loader: ExtractTextPlugin.extract("style-loader", "css!postcss!less") },
			{ test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css!postcss") },
			{ test: /\.json/, loader: "json" },
			{ test: /\.(png|jpg|gif)$/,  loader: 'url',  query: {limit: 2048,  name: imageName} },
			{ test: /\.woff(\?\S*)?$/,  loader: "url",  query: {limit: 100,  mimetype: 'application/font-woff',  name: fontName} },
			{ test: /\.woff2(\?\S*)?$/,  loader: "url",  query: {limit: 100,  mimetype: 'application/font-woff2',  name: fontName} },
			{ test: /\.ttf(\?\S*)?$/,  loader: "url",  query: {limit: 100,  mimetype: "application/octet-stream",  name: fontName} },
			{ test: /\.eot(\?\S*)?$/,  loader: "url",  query: {limit: 100,  name: fontName} },
			{ test: /\.svg(\?\S*)?$/,  loader: "url",  query: {limit: 10000,  mimetype: "image/svg+xml",  name: fontName} },
		]
	},
	plugins: [
		new ExtractTextPlugin("css/[name].css"),
		new webpack.DefinePlugin({"process.env": { "NODE_ENV": JSON.stringify("production") }}),
		new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false,  sourceMap: false } })
	],
	postcss: () => {
		autoPrefixer({ browsers: ["last 2 versions", "> 1%"] })
	}
}
