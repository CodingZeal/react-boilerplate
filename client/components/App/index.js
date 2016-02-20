import React, { PropTypes } from 'react'

import styles from './styles.scss'

const propTypes = {
  children: PropTypes.element
}

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
