import React, { PropTypes } from 'react'

const propTypes = {
  children: PropTypes.element
}

export default function App({ children }) {
  return (
    <div>
      <h1>Zeal React Boilerplate Test</h1>
      {children}
    </div>
  )
}

App.propTypes = propTypes
