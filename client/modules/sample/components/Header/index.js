import React from 'react'

import styles from './styles.scss'
import zealLogo from './zeal_logo.png'

export default function Header() {
  return (
    <h1 className={styles.heading}>
      <img className={styles.logo} src={zealLogo} />
      <span className={styles.title}>
        Zeal React Boilerplate Test
      </span>
    </h1>
  )
}
