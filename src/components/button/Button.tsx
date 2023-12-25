import { ReactNode } from 'react'
import styles from './Button.module.css'

export default function Button({
  children,
  onClick,
  active,
  disabled,
}: {
  children: ReactNode
  onClick?: () => void
  active?: boolean
  disabled?: boolean
}) {
  return (
    <div onClick={onClick} className={`${styles.container} ${active && styles.active} ${disabled && styles.disabled}`}>
      {children}
    </div>
  )
}
