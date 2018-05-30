var webpack = require('webpack')
var path = require('path')

var BUILD_DIR = path.resolve(__dirname + '/build')
var APP_DIR = path.resolve(__dirname + '/app')

config = {
  entry: [
    'whatwg-fetch',
    'react-hot-loader/patch',
    APP_DIR + '/index.js'
  ],
  module: {
    rules: [
      {
        test: /\jsx?/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(s*)css$/,
        use: ['style-loader','css-loader', 'sass-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: BUILD_DIR,
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: BUILD_DIR,
    hot: true,
    historyApiFallback: true,
  }
};

module.exports = config;
