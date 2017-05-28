/*global module, require, __dirname */

var webpack = require('webpack');
var path = require('path');

var loaders = [
  { test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader'] },
  { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
  { test: /\.(ttf|otf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
  { test: /\.(jpg|png|gif|jpeg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
  { test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] },
  { test: /\.css$/, loaders: ['style-loader', 'css-loader'] },
  { test: /\.json$/, loader: 'json-loader' }
];

module.exports = {
  devtool: 'source-map',
  entry: './js/index.js',
  output: {
    path: __dirname,
    publicPath: '',
    filename: 'index.js'
  },
  module: {
    loaders: loaders
  },
  resolve: {
    alias: {
      'asdf': path.resolve('./src'),
      'app': path.resolve('./js')
    }
  }
};
