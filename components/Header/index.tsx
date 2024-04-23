import React from 'react'

import { Authorization } from './Authorization'

import styles from './Header.module.sass'

const Header = () => {
  return (
    <header className={styles.container}>
      <img src="/logo.png" alt="Logo" className={styles.image} />
      <p className={styles.text}>An application for doctors</p>
      <Authorization />
    </header>
  )
}

export { Header }
