const config = require('./base')

config.module.loaders.push({
  test: /\.scss$/,
  loaders: [
    'css/locals?modules&importLoaders=1' +
      '&localIdentName=[path][local]__[hash:base64:5]',
    'sass'
  ]
})

module.exports = config
