const config = require('./base')

config.entry.unshift(
  'webpack-dev-server/client?http://localhost:8080',
  'webpack/hot/only-dev-server'
)

const jsLoaderIndex = config.module.loaders
  .findIndex(loader => String(loader.test) === String(/\.js$/))

config.module.loaders[jsLoaderIndex].loaders.unshift('react-hot-loader')

config.module.loaders.push({
  test: /\.scss$/,
  loaders: [
    'style',
    'css?modules&importLoaders=1' +
      '&localIdentName=[local]__[hash:base64:5]!sass'
  ]
})

config.output.publicPath = 'http://localhost:8080/'

module.exports = config
