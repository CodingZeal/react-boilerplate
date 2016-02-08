import { applyMiddleware, compose, createStore } from 'redux'
import { createHistory } from 'history'
import { syncHistory } from 'react-router-redux'
import thunk from 'redux-thunk'

import devToolsEnhancer from './devToolsEnhancer'

export const history = createHistory()

const reduxRouterMiddleware = syncHistory(history)

import reducer from 'reducers'

const store = createStore(reducer, undefined,
  compose(
    applyMiddleware(thunk, reduxRouterMiddleware),
    devToolsEnhancer
  )
)

if (module.hot) {
  module.hot.accept('../reducers', () => {
    const nextReducer =
      require('../reducers').default // eslint-disable-line global-require

    store.replaceReducer(nextReducer)
  })
}

reduxRouterMiddleware.listenForReplays(store)

export default store
