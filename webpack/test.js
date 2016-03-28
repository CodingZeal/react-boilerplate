const config = require('./base')
const nodeExternals = require('webpack-node-externals')

config.module.loaders.push({
  test: /\.scss$/,
  loaders: [
    'css/locals?modules&importLoaders=1' +
      '&localIdentName=[path][local]__[hash:base64:5]',
    'sass'
  ]
})

// Don't run linters in this environment.
// We get a number of false positives due to the handling of node externals.
config.module.preLoaders = []

config.externals = [nodeExternals()]
config.target = 'node'

module.exports = config
