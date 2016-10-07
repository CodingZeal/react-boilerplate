const webpackConfig = require('./webpack.config')

// eslint-disable-next-line no-process-env
process.env.BABEL_ENV = 'test' // so we load the correct babel plugins
const specHelper = '__tests__/specHelper.js'
const testGlob = '**/*-spec.js'

module.exports = function setKarmaConfig(config) {
  config.set({
    autoWatch: false,
    basePath: 'client',
    browsers: ['Chrome'],
    colors: true,
    concurrency: Infinity,
    coverageReporter: {
      reporters: [
        { type: 'lcov', dir: '../coverage/', subdir: '.' },
        { type: 'json', dir: '../coverage/', subdir: '.' },
        { type: 'text-summary' }
      ]
    },
    files: [specHelper, testGlob].map(dontWatch),
    frameworks: ['mocha', 'chai'],
    logLevel: config.LOG_INFO,
    port: 9876,
    preprocessors: {
      [specHelper]: ['webpack'],
      [testGlob]: ['webpack']
    },
    reporters: ['mocha', 'coverage'],
    singleRun: true,
    webpack: webpackConfig,
    webpackMiddleware: { noInfo: true }
  })
}

function dontWatch(pattern) {
  return {
    pattern,
    included: true,
    served: true,
    watched: false
  }
}
