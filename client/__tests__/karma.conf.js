const webpackConfig = require('../../webpack/development.js')

module.exports = config => {
  config.set({
    basePath: '../..',
    browsers: ['Chrome'],
    singleRun: false,
    frameworks: ['chai', 'mocha'],
    files: [
      'client/**/*-spec.js'
    ],
    preprocessors: {
      'client/**/*-spec.js': ['webpack']
    },
    reporters: ['dots'],
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    }
  })
}
