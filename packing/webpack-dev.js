var webpack = require("webpack");
var config = require("config");
var autoPrefixer = require("autoPrefixer");
var path = require("path");

var imageName = "images/[name].[ext]";
var fontName = "fonts/[name].[ext]";

var rootDir = path.join(__dirname, "..");
var main = path.join(rootDir, "app/entry");
var localTestEntry = path.join(rootDir, 'local-test/index');
var outputPath = path.join(rootDir, "build/");

module.exports = {
  entry: main,
  debug: true,
  devtool: 'eval-source-map',
  errorDetails: true,
  delay: 50,
	output: {
    path: outputPath,
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
			{ test: /\.less$/, loader: 'style!css?sourceMap!postcss!less?sourceMap' },
			{ test: /\.css$/, loader: 'style!css?sourceMap!postcss' },
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
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
	postcss: () => {
		autoPrefixer({ browsers: ["last 2 versions", "> 1%"] })
	}
}
