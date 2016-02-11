const config = require('./base')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

config.module.loaders.push({
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract(
    'style',
    'css?modules&importLoaders=1' +
      '&localIdentName=[local]__[hash:base64:5]!sass'
  )
})

config.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      screw_ie8: true,
      warnings: false
    },
    sourceMap: false
  })
)

module.exports = config
