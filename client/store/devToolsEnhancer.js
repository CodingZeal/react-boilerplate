module.exports =
  process.env.NODE_ENV === 'production' // eslint-disable-line no-process-env
    ? require('./devToolsEnhancer.prod')
    : require('./devToolsEnhancer.dev')
