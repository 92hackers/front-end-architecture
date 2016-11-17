const webpack = require('webpack');
const config = require('config');
const autoPrefixer = require('autoprefixer');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const imageName = 'images/[name].[ext]';
const fontName = 'fonts/[name].[ext]';

const rootDir = path.join(__dirname, '..');
const main = path.join(rootDir, 'app/entry');
// const localTestEntry = path.join(rootDir, 'local-test/index');
// const outputPath = path.join(rootDir, 'build/');

const htmlOptions = {
  template: path.join(rootDir, 'app/template.html'),
  hash: true,
};

module.exports = {
  entry: [main],
  debug: true,
  devtool: 'eval-source-map',
  errorDetails: true,
  delay: 50,
  output: {
    path: '/',
    publicPath: 'http://localhost:3001/',
    filename: 'js/[name].js',
  },
  resolve: {
    extensions: ['', '.js', '.coffee', '.jsx', '.less', 'css'],
  },
  exclude: [
    path.resolve(rootDir, 'node_modules'),
  ],
  module: {
    loaders: [
      { test: /\.jsx$/,
        loader: 'babel',
        query: {
          presets: [
            'es2015',
            {
              plugins: [
                'transform-decorators-legacy',
                'transform-object-rest-spread',
              ],
            },
            'react',
          ],
        },
        exclude: /node_modules/,
      },
      { test: /\.js$/,
        loader: 'babel',
        query: {
          presets: [
            'es2015',
            {
              plugins:
              [
                'transform-decorators-legacy',
                'transform-object-rest-spread',
              ],
            },
          ],
        },
        exclude: /node_modules/,
      },
      { test: /\.coffee$/, loader: 'coffee' },
      { test: /\.less$/, loader: ExtractTextPlugin.extract('style', 'css!postcss!less') },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css!postcss') },
      { test: /\.json$/, loader: 'json' },
      { test: /\.ico$/, loader: 'url', query: { limit: 2048, name: imageName } },
      { test: /\.(png|jpg|gif)$/, loader: 'url', query: { limit: 2048, name: imageName } },
      { test: /\.woff(\?\S*)?$/, loader: 'url', query: { limit: 100, mimetype: 'application/font-woff', name: fontName } },
      { test: /\.woff2(\?\S*)?$/, loader: 'url', query: { limit: 100, mimetype: 'application/font-woff2', name: fontName } },
      { test: /\.ttf(\?\S*)?$/, loader: 'url', query: { limit: 100, mimetype: 'application/octet-stream', name: fontName } },
      { test: /\.eot(\?\S*)?$/, loader: 'url', query: { limit: 100, name: fontName } },
      { test: /\.svg(\?\S*)?$/, loader: 'url', query: { limit: 10000, mimetype: 'image/svg+xml', name: fontName } },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify('dev'),
      API_HOST: JSON.stringify(config.devHost),
      API_VERSION: JSON.stringify(config.apiVersion),
    }),
    new ExtractTextPlugin('css/[name].css'),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin(htmlOptions),
    new webpack.NoErrorsPlugin(),
  ],
  postcss: () => {
    autoPrefixer({ browsers: ['last 2 versions', '> 1%'] })
  },
}
