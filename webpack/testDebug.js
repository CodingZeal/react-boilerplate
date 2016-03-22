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

config.output.publicPath = 'http://localhost:8081/'

module.exports = config
