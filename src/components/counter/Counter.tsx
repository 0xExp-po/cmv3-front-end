import React from 'react'
import styles from './counter.module.css'

interface CounterProps {
  maxValue: number
  value: number
}

const Counter: React.FC<CounterProps> = ({ maxValue, value }) => {
  const calculatePercentage = () => {
    if (maxValue === 0) return 0
    return (value / maxValue) * 100
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.fill} style={{ width: `${calculatePercentage()}%` }}></div>
      </div>
      <div className={styles.counter}>
        {value} / {maxValue}
      </div>
    </div>
  )
}

export default Counter
