const hook = require('css-modules-require-hook')

hook({
  extensions: ['.scss'],
  generateScopedName: '[name]__[local]___[hash:base64:5]'
})
