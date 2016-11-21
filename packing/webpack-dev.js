import path from 'path'
import config from 'config'
import webpack from 'webpack'
import autoPrefixer from 'autoprefixer'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import { default as webpackConfig } from './webpack-build'

// const localTestEntry = path.join(rootDir, 'local-test/index');
// const outputPath = path.join(rootDir, 'build/')

const htmlOptions = {
  template: path.join(`${__dirname}/../app/template.html`),
  hash: true,
};

const { devHost, apiVersion } = config
const {
  HotModuleReplacementPlugin,
  NoErrorsPlugin,
} = webpack
const plugins = [
  new webpack.DefinePlugin({
    ENV: JSON.stringify('dev'),
    API_HOST: JSON.stringify(devHost),
    API_VERSION: JSON.stringify(apiVersion),
  }),
  new ExtractTextPlugin('css/[name].css'),
  new HotModuleReplacementPlugin(),
  new HtmlWebpackPlugin(htmlOptions),
  new NoErrorsPlugin(),
]

const {
  entry,
  resolve,
  module,
  exclude,
} = webpackConfig

export default {
  entry,
  resolve,
  exclude,
  module,
  plugins,
  debug: true,
  devtool: 'eval-source-map',
  errorDetails: true,
  delay: 50,
  output: {
    path: '/',
    publicPath: 'http://localhost:3001/',
    filename: 'js/[name].js',
  },
  postcss: () => {
    autoPrefixer({ browsers: ['last 2 versions', '> 1%'] })
  },
}
