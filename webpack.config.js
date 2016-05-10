var webpack = require('webpack');
var path = require('path');

module.exports = {
  debug: true,
  devtool: '#eval-source-map',
  context: path.join(__dirname, 'resources/assets/js'),

  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    './application'
  ],

  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/',
    filename: 'bundle.js'
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],


  module: {
    loaders: [
      {
        test: [/\.js?$/,/\.jsx?$/],
        exclude:[/node_modules/, /rpi_server/],
        loaders: ['react-hot', 'babel'],
        loose:['es6.modules']
      },
      { test: /\.css$/, loader: "style!css" },
      { test: /\.less$/, loader: 'style!css!less' },

      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },

      { test: /.*\.(gif|png|jpe?g|svg)$/i, loader:'file-loader' },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },

    ]
  }
};
