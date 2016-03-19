const config = require('./base')

config.entry.client.unshift(
  'webpack-dev-server/client?http://localhost:8080',
  'webpack/hot/only-dev-server'
)

const jsLoaderIndex = config.module.loaders
  .findIndex(loader => String(loader.test) === String(/\.js$/))

config.module.loaders[jsLoaderIndex].loaders.unshift('react-hot-loader')

config.output.publicPath = 'http://localhost:8080/'

module.exports = config
