import path from 'path'
import config from 'config'
import webpack from 'webpack'
import autoPrefixer from 'autoprefixer'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

// const imageName = 'images/[name].[hash:8].[ext]';
// const fontName = 'fonts/[name].[hash:8].[ext]';

const imageName = 'images/[name].[ext]';
const fontName = 'fonts/[name].[ext]';

const rootDir = path.join(__dirname, '..');
const main = path.join(rootDir, 'app/entry');
const outputPath = path.join(rootDir, 'build/');

const htmlOptions = {
  template: path.join(rootDir, 'app/template.html'),
  hash: true,
};
const uglifyOptions = {
  comments: false,
};

const { apiVersion, productionHost, devHost } = config
let env = ''
let apiHost = ''
if (process.env.NODE_ENV === 'production') {
  env = 'production'
  apiHost = productionHost
} else {
  env = 'dev'
  apiHost = devHost
}

const { optimize, DefinePlugin } = webpack
const {
  DedupePlugin,
  OccurrenceOrderPlugin,
  UglifyJsPlugin,
} = optimize
const plugins = [
  new DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
    ENV: JSON.stringify(env),
    API_HOST: JSON.stringify(apiHost),
    API_VERSION: JSON.stringify(apiVersion),
  }),
  new ExtractTextPlugin('css/[name].[hash:8].css'),
  new HtmlWebpackPlugin(htmlOptions),
  new DedupePlugin(),
  new OccurrenceOrderPlugin(),
  new UglifyJsPlugin(uglifyOptions),
]

const jsPlugins = [
  'transform-decorators-legacy',
  'transform-object-rest-spread',
]

export default {
  entry: [main],
  output: {
    path: outputPath,
    publicPath: '/',
    filename: 'js/[name].[chunkhash:8].js',
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
        query: { presets: ['es2015', { plugins: jsPlugins }, 'react'] },
      },
      { test: /\.js$/,
        loader: 'babel',
        query: { presets: ['es2015', { plugins: jsPlugins }] },
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
  plugins,
  postcss: () => {
    autoPrefixer({ browsers: ['last 2 versions', '> 1%'] })
  },
}
