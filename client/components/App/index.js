import React, { PropTypes } from 'react'

const propTypes = {
  children: PropTypes.element
}

import styles from './styles.scss'

export default function App({ children }) {
  return (
    <div>
      <h1 className={styles.heading}>
        Zeal React Boilerplate Test
      </h1>

      {children}
    </div>
  )
}

App.propTypes = propTypes
