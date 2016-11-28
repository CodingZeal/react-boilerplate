import { applyMiddleware, createStore } from 'redux'
import { apiMiddleware } from 'redux-api-middleware'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import thunk from 'redux-thunk'

import reducer from './reducer'

export default function() {
  const store = createStore(reducer,
    composeWithDevTools(
      applyMiddleware(thunk, apiMiddleware)
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
