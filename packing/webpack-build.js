var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoPrefixer = require("autoprefixer");
var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');

// var imageName = "images/[name].[hash:8].[ext]";
// var fontName = "fonts/[name].[hash:8].[ext]";

var imageName = "images/[name].[ext]";
var fontName = "fonts/[name].[ext]";

var rootDir = path.join(__dirname, "..");

var main = path.join(rootDir, "app/entry");

var localTestEntry = path.join(rootDir, 'local-test/index');

var outputPath = path.join(rootDir, "build/");

var htmlOptions = {
  template: path.join(rootDir, "app/template.html"),
  hash: true
};

var uglifyOptions = {
  comments: false
};

module.exports = {
  entry: [main],
	output: {
    path: outputPath,
    publicPath: "/",
		filename: "js/[name].[chunkhash:8].js"
	},
	resolve: {
		extensions: ["", ".js", ".coffee", ".jsx", ".less", "css"]
	},
  exclude: [
    path.resolve(rootDir, "node_modules"),
  ],
	module: {
		loaders: [
			{ test: /\.jsx$/, loader: "babel", query: { presets: ["es2015", "react"]}, exclude: /node_modules/ },
			{ test: /\.js$/, loader: "babel", query: { presets: ["es2015", {plugins: ["transform-object-rest-spread"]}] }, exclude: /node_modules/ },
			{ test: /\.coffee$/, loader: "coffee"},
			{ test: /\.less$/, loader: ExtractTextPlugin.extract("style", "css!postcss!less") },
			{ test: /\.css$/, loader: ExtractTextPlugin.extract("style", "css!postcss") },
			{ test: /\.json$/, loader: "json"},
			{ test: /\.(png|jpg|gif)$/,  loader: 'url',  query: {limit: 2048,  name: imageName} },
			{ test: /\.woff(\?\S*)?$/,  loader: "url",  query: {limit: 100,  mimetype: 'application/font-woff',  name: fontName} },
			{ test: /\.woff2(\?\S*)?$/,  loader: "url",  query: {limit: 100,  mimetype: 'application/font-woff2',  name: fontName} },
			{ test: /\.ttf(\?\S*)?$/,  loader: "url",  query: {limit: 100,  mimetype: "application/octet-stream",  name: fontName} },
			{ test: /\.eot(\?\S*)?$/,  loader: "url",  query: {limit: 100,  name: fontName} },
			{ test: /\.svg(\?\S*)?$/,  loader: "url",  query: {limit: 10000,  mimetype: "image/svg+xml",  name: fontName} }
		]
	},
  plugins: process.env.NODE_ENV === 'production' ? [
		new ExtractTextPlugin("css/[name].[hash:8].css"),
    new HtmlWebpackPlugin(htmlOptions),
		new webpack.DefinePlugin({"process.env": { "NODE_ENV": JSON.stringify(process.env.NODE_ENV) }}),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(uglifyOptions)
  ] : [
		new ExtractTextPlugin("css/[name].[hash:8].css"),
    new HtmlWebpackPlugin(htmlOptions)
  ],
	postcss: () => {
		autoPrefixer({ browsers: ["last 2 versions", "> 1%"] })
	}
}
