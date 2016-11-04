import es6promise from 'es6-promise'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { Router, configureStore } from 'base'

es6promise.polyfill()

const store = configureStore()

function renderApp() {
  ReactDOM.render(
    <Provider store={store}>
      <Router store={store} />
    </Provider>,
    document.getElementById('root')
  )
}

document.addEventListener('DOMContentLoaded', renderApp)
