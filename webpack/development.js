const config = require('./base')
const DashboardPlugin = require('webpack-dashboard/plugin')

config.entry.client.unshift(
  'webpack-dev-server/client?http://localhost:8080',
  'webpack/hot/only-dev-server'
)

config.module.loaders.push({
  test: /\.scss$/,
  loaders: [
    'style',
    'css?modules&importLoaders=1' +
      '&localIdentName=[path][local]__[hash:base64:5]!sass'
  ]
})

config.output.publicPath = 'http://localhost:8080/'

config.plugins.push(new DashboardPlugin())

module.exports = config
