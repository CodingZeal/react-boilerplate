const path = require('path')

const config = require('./base')

config.devServer = {
  host: 'localhost',
  port: '8081'
}

const index = path.resolve(__dirname, '../client/__tests__/index.js')

config.entry = {
  test: [`mocha!${index}`]
}

config.module.loaders.push({
  test: /\.scss$/,
  loaders: [
    'style',
    'css?modules&importLoaders=1' +
      '&localIdentName=[local]__[hash:base64:5]!sass'
  ]
})

config.output.publicPath = 'http://localhost:8081/'

module.exports = config
