import { identity } from 'ramda'

const isProduction =
  process.env.NODE_ENV === 'production' // eslint-disable-line no-process-env

const devToolsExtension = isProduction
  ? identity
  : (window.devToolsExtension() || identity)

export default devToolsExtension
