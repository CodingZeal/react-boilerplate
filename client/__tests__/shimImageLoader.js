function shim(module, filepath) {
  const src = `module.exports = '${filepath}';`

  return module._compile(src) // eslint-disable-line no-underscore-dangle
}

require.extensions['.png'] = shim
