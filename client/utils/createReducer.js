import { identity, propOr } from 'ramda'

export default function createReducer(initialState, handlers) {
  return (state = initialState, action) =>
    propOr(identity, action.type, handlers)(state, action)
}
