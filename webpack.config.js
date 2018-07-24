const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    predator: './predator/src/main.js',
  },
  output: {
    filename: '[name]_bundle.js',
    path: __dirname + '/dist'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname),
    publicPath: '/dist/',
    historyApiFallback: true
  },
  module: {
    rules: [{
        test: /\.scss$/,
        use: [
            "style-loader", // creates style nodes from JS strings
            "css-loader", // translates CSS into CommonJS
            "sass-loader" // compiles Sass to CSS
        ]
    }]
  }
};