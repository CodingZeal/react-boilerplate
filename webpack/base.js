const path = require('path')
const webpack = require('webpack')

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
        loader: 'file-loader?name=style.css'
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
    new webpack.ProvidePlugin({
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ],
  resolve: {
    root: path.resolve(__dirname, '../client'),
    extensions: ['', '.js']
  }
}
