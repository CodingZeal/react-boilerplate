const nodeExternals = require('webpack-node-externals')

const config = require('./base')

config.module.loaders.push({
  test: /\.scss$/,
  loaders: [
    'style',
    'css?modules&importLoaders=1' +
      '&localIdentName=[local]__[hash:base64:5]!sass'
  ]
})

config.target = 'node'
config.externals = [nodeExternals()]

module.exports = config
