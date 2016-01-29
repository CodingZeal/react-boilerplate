import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routeReducer } from 'react-router-redux'

import appReducer from './app'

export default combineReducers({
  app: appReducer,
  form: formReducer,
  routing: routeReducer
})
