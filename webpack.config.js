module.exports =
  process.env.NODE_ENV === 'production' // eslint-disable-line no-process-env
    ? require('./webpack/production.js')
    : require('./webpack/development.js')
