import { isFSA } from 'flux-standard-action'
import { identity, propOr } from 'ramda'

class NonStandardAction {
  constructor(action) {
    this.action = action
    this.message =
      'attempting to handle an action that is not a flux-standard-action'
    this.stack = (new Error()).stack
    this.toString = () => `${this.message}: ${JSON.stringify(this.action)}`
  }
}

const throwIfNotFSA = action => {
  if (isFSA(action)) return

  throw new NonStandardAction(action)
}

// eslint-disable-next-line no-process-env
const isProduction = process.env.NODE_ENV === 'production'
const ensureIsFSA = isProduction ? identity : throwIfNotFSA

export default (initialState, handlers) =>
  (state = initialState, action) => {
    ensureIsFSA(action)

    return propOr(identity, action.type, handlers)(state, action)
  }
