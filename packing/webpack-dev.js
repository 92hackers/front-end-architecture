var webpack = require("webpack");
var config = require("config");
var autoPrefixer = require("autoPrefixer");
var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

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

module.exports = {
  entry: [main],
  debug: true,
  devtool: 'eval-source-map',
  errorDetails: true,
  delay: 50,
	output: {
    path: "/",
    publicPath: "http://localhost:3001/",
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
			{ test: /\.(png|jpg|gif)$/,  loader: 'url',  query: {limit: 2048,  name: imageName} },
			{ test: /\.woff(\?\S*)?$/,  loader: "url",  query: {limit: 100,  mimetype: 'application/font-woff',  name: fontName} },
			{ test: /\.woff2(\?\S*)?$/,  loader: "url",  query: {limit: 100,  mimetype: 'application/font-woff2',  name: fontName} },
			{ test: /\.ttf(\?\S*)?$/,  loader: "url",  query: {limit: 100,  mimetype: "application/octet-stream",  name: fontName} },
			{ test: /\.eot(\?\S*)?$/,  loader: "url",  query: {limit: 100,  name: fontName} },
			{ test: /\.svg(\?\S*)?$/,  loader: "url",  query: {limit: 10000,  mimetype: "image/svg+xml",  name: fontName} },
		]
	},
  plugins: [
		new webpack.DefinePlugin({"process.env": { "NODE_ENV": JSON.stringify(process.env.NODE_ENV) }}),
		new ExtractTextPlugin("css/[name].css"),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin(htmlOptions),
    new webpack.NoErrorsPlugin()
  ],
	postcss: () => {
		autoPrefixer({ browsers: ["last 2 versions", "> 1%"] })
	}
}
