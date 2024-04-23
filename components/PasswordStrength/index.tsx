import React from 'react'
import cn from 'classnames'

import styles from './PasswordStrength.module.sass'

const getColor = (value: number): string => {
  switch (value) {
    case 1:
      return 'orange'
    case 2:
      return 'yellow'
    case 3:
      return 'green'
    default:
      return 'red'
  }
}

interface IProps {
  passStrength: number
}
const PasswordStrength: React.FC<IProps> = ({ passStrength }) => {
  const getClass = () => {
    return styles[`${getColor(passStrength)}`]
  }

  return (
    <div className={styles.container}>
      {Array.from({ length: passStrength + 1 }).map((_, index) => (
        <div key={index} className={cn(styles.item, getClass())} />
      ))}
    </div>
  )
}

export default PasswordStrength
