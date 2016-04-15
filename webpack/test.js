const config = require('./base')

config.devtool = 'cheap-module-source-map'

config.module.loaders.push({
  test: /\.scss$/,
  loaders: [
    'css/locals?modules&importLoaders=1' +
      '&localIdentName=[path][local]__[hash:base64:5]',
    'sass'
  ]
})

config.target = 'node'

module.exports = config
