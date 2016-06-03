import { combineReducers } from 'redux'

import { sampleReducer } from 'modules/sample'

export default combineReducers({
  sample: sampleReducer
})
