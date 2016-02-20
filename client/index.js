import es6promise from 'es6-promise'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import 'bootswatch/spacelab/bootstrap.css'

import AppRouter from 'routes/AppRouter'
import store from 'store'

es6promise.polyfill()

document.addEventListener('DOMContentLoaded', () =>
  ReactDOM.render(
    <Provider store={store}>
      <AppRouter />
    </Provider>,
    document.getElementById('root')
  )
)
