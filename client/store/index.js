import { applyMiddleware, compose, createStore } from 'redux'
import { apiMiddleware } from 'redux-api-middleware'
import thunk from 'redux-thunk'

import devToolsExtension from './devToolsExtension'
import reducer from 'reducers'

const store = createStore(reducer,
  compose(
    applyMiddleware(thunk, apiMiddleware),
    devToolsExtension
  )
)

if (module.hot) {
  module.hot.accept('../reducers', () => {
    const nextReducer =
      require('../reducers').default // eslint-disable-line global-require

    store.replaceReducer(nextReducer)
  })
}

export default store
