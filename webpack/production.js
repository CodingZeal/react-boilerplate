const config = require('./base')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const extractSCSS = new ExtractTextPlugin('client.css', {
  allChunks: true
})

const scssLoaderIndex = config.module.loaders
  .findIndex(loader => String(loader.test) === String(/\.scss$/))

config.module.loaders[scssLoaderIndex].loader = extractSCSS.extract(
  'style',
  'css?modules&importLoaders=1' +
    '&localIdentName=[local]__[hash:base64:5]!sass'
)

config.plugins.push(
  extractSCSS,
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      screw_ie8: true, // eslint-disable-line camelcase
      warnings: false
    },
    sourceMap: false
  })
)

module.exports = config
