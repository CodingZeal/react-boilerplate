import { applyMiddleware, compose, createStore } from 'redux'
import { createHistory } from 'history'
import { syncHistory } from 'react-router-redux'
import thunk from 'redux-thunk'

import devToolsExtension from './devToolsExtension'
import reducer from 'reducers'

export const history = createHistory()

const reduxRouterMiddleware = syncHistory(history)

const store = createStore(reducer,
  compose(
    applyMiddleware(thunk, reduxRouterMiddleware),
    devToolsExtension
  )
)

const hotLoader = module.hot

if (hotLoader) {
  hotLoader.accept('../reducers', () => {
    const nextReducer =
      require('../reducers').default // eslint-disable-line global-require

    store.replaceReducer(nextReducer)
  })
}

reduxRouterMiddleware.listenForReplays(store)

export default store
