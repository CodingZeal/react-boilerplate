function config() { // eslint-disable-line complexity
  switch (process.env.NODE_ENV) { // eslint-disable-line no-process-env
    case 'production':
      return 'production'
    case 'test':
      return 'test'
    case 'test-debug':
      return 'testDebug'
    default:
      return 'development'
  }
}

module.exports = require(`./webpack/${config()}.js`)
