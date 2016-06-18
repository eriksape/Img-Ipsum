var webpack = require('webpack');
var path = require('path');

var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
});

module.exports = {
  debug: true,
  devtool: '#eval-source-map',
  context: path.join(__dirname, 'resources/assets/js'),

  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    './application.index.js'
  ],

  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/',
    filename: 'bundle.js'
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    definePlugin
  ],


  module: {
    loaders: [
      {
        test: [/\.jsx?$/],
        exclude:[/node_modules/, /rpi_server/],
        loaders: ['react-hot', 'babel'],
        loose:['es6.modules'],
      },
      {
        test: [/\.js?$/],
        exclude:[/node_modules/, /rpi_server/],
        loader: 'babel',
        loose:['es6.modules'],
      },
      { test: /\.css$/, loader: "style!css" },
      { test: /\.less$/, loader: 'style!css!less' },

      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },

      { test: /.*\.(gif|png|jpe?g|svg)$/i, loader:'file-loader' },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },

    ]
  }
};
