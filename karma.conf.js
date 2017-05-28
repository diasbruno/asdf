/* global require, module */

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

module.exports = function(config) {
  config.set({
    files: [
      { pattern: 'tests/*.spec.js' }
    ],

    preprocessors: {
      'tests/*.spec.js': ['webpack', 'coverage']
    },

    webpack: {
      devtool: 'inline-source-map',
      module: { loaders: loaders },
      resolve: { alias: { 'asdf': path.resolve('./src') } }
    },

    coverageReporter: {
      dir: 'build/coverage/',
      reporters: [
        { type: 'text' },
        { type: 'text-summary' }
      ],
      check: { global: { excludes: ['node_modules/**/*.js'] } }
    },

    frameworks: ['mocha'],
    reporters: ['spec', 'coverage'],
    browsers: ['PhantomJS'],

    plugins: [
      require("karma-webpack"),
      require('karma-mocha'),
      require("karma-coverage"),
      require("karma-spec-reporter"),
      require("karma-phantomjs-launcher")
    ]
  });
};
