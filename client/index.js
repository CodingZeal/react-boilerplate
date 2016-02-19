import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import 'bootswatch/spacelab/bootstrap.css'
require('es6-promise').polyfill()

import AppRouter from 'routes/AppRouter'
import store from 'store'

document.addEventListener('DOMContentLoaded', () =>
  ReactDOM.render(
    <Provider store={store}>
      <AppRouter />
    </Provider>,
    document.getElementById('root')
  )
)
