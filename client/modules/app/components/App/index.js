import React, { PropTypes } from 'react'
import 'foundation-apps/dist/css/foundation-apps.css'

import { Header } from 'modules/sample'

const propTypes = {
  children: PropTypes.element
}

export default function App({ children }) {
  return (
    <div>
      <Header />

      {children}
    </div>
  )
}

App.propTypes = propTypes
