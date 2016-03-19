const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const extractCSS = new ExtractTextPlugin('vendor.css', {
  allChunks: true
})

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
        loader: extractCSS.extract('css')
      }, {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
        loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
      }
    ],
    preLoaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint-loader'
    }, {
      test: /\.scss$/,
      exclude: /node_modules/,
      loader: 'sasslint-loader'
    }]
  },
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: '[name].js'
  },
  plugins: [
    extractCSS,
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.ProvidePlugin({
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ],
  resolve: {
    root: path.resolve(__dirname, '../client'),
    extensions: ['', '.js']
  },
  sasslint: {
    configFile: path.resolve(__dirname, '../.sass-lint.yml')
  }
}
