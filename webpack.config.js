const path = require('path')
const webpack = require('webpack')

module.exports = {
  context: __dirname, // wherever webpack command is run, context is root dir,
  devtool: 'sourcemaps', // debug errors refer to source code ln, not bundle ln
  resolve: {
    extensions: ['.js'],
  },
  stats: {
    colors: true,
    reasons: true, //  why things fail
    chunks: true,
  },  
  entry: {
    app: ['babel-polyfill', 'whatwg-fetch', './src/index.js'],
  },
  output: {
    path: path.join(__dirname, '/public'),
    filename: '[name].js',
  },
  devServer: {
    contentBase: path.join(__dirname, '/public'),
    publicPath: '/',
    port: 8000,
    historyApiFallback: true,
    disableHostCheck: true,
  },
  plugins: [
    new webpack.DefinePlugin({ CONFIG: JSON.stringify(require('config')) })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [
          /node_modules/,
          /config/,
        ],
        loader: 'babel-loader',
      },  
  ]
},
}