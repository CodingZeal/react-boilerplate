import { identity } from 'ramda'

const isProduction =
  process.env.NODE_ENV === 'production' // eslint-disable-line no-process-env

const devToolsExtension = isProduction || !window.devToolsExtension
  ? identity
  : window.devToolsExtension()

export default devToolsExtension
