/* eslint complexity: [1, 3] */
function config() {
  // eslint-disable-next-line no-process-env
  switch (process.env.NODE_ENV) {
    case 'production':
      return 'production'
    case 'test':
      return 'test'
    default:
      return 'development'
  }
}

module.exports = require(`./webpack/${config()}.js`)
