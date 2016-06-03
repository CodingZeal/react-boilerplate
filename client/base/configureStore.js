import { applyMiddleware, compose, createStore } from 'redux'
import { apiMiddleware } from 'redux-api-middleware'
import thunk from 'redux-thunk'

import devToolsExtension from './devToolsExtension'
import reducer from './reducer'

export default function() {
  const store = createStore(reducer,
    compose(
      applyMiddleware(thunk, apiMiddleware),
      devToolsExtension
    )
  )

  if (module.hot) {
    module.hot.accept('./reducer', () => {
      const nextReducer =
        require('./reducer').default // eslint-disable-line global-require

      store.replaceReducer(nextReducer)
    })
  }

  return store
}
