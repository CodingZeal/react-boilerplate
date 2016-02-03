const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: [path.resolve(__dirname, '../client/index.js')],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel']
      }, {
        test: /\.css/,
        loader: ExtractTextPlugin.extract('css')
      }
    ],
    preLoaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint-loader'
    }]
  },
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: 'client.js'
  },
  plugins: [
    new ExtractTextPlugin('style.css', {
      allChunks: true
    }),
    new webpack.ProvidePlugin({
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ],
  resolve: {
    root: path.resolve(__dirname, '../client'),
    extensions: ['', '.js']
  }
}
