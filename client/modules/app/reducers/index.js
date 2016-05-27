import { combineReducers } from 'redux'

import { SampleReducer } from 'modules/sample'

export default combineReducers({
  sample: SampleReducer
})
