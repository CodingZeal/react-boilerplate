const webpackConfig = require('./webpack.config')

// eslint-disable-next-line no-process-env
process.env.BABEL_ENV = 'test' // so we load the correct babel plugins
const testGlob = '**/*-spec.js'
const srcGlob = '**/*!(-spec).js'

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
    files: [{
      pattern: testGlob,
      watched: false,
      served: true,
      included: true
    }, testGlob],
    frameworks: ['mocha', 'chai-as-promised', 'chai'],
    logLevel: config.LOG_INFO,
    port: 9876,
    preprocessors: {
      [testGlob]: 'webpack',
      [srcGlob]: ['webpack']
    },
    reporters: ['mocha', 'coverage'],
    singleRun: true,
    webpack: webpackConfig,
    webpackMiddleware: { noInfo: true }
  })
}
