import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'

import { Router, configureStore, history } from 'base'

const store = configureStore()
const syncedHistory = syncHistoryWithStore(history, store)

function renderInnerApp(LocalRouter) {
  return (
    <Provider store={store}>
      <LocalRouter history={syncedHistory} />
    </Provider>
  )
}

function renderApp() {
  ReactDOM.render(
    <AppContainer>
      {renderInnerApp(Router)}
    </AppContainer>,
    document.getElementById('root')
  )

  if (module.hot) {
    module.hot.accept('./base', () => {
      // eslint-disable-next-line global-require
      const NextRouter = require('./base').Router

      ReactDOM.render(
        <AppContainer>
          {renderInnerApp(NextRouter)}
        </AppContainer>,
      document.getElementById('root')
    )
    })
  }
}

document.addEventListener('DOMContentLoaded', renderApp)
