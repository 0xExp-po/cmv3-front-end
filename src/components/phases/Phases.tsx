import React from 'react'
import styles from './phases.module.css'
import { Phase as PhaseType } from 'use-cmv3/dist/esm/types/phase'
import Button from '../button/Button'
import { Clock } from 'use-cmv3'

interface PhasesProps {
  children: React.ReactNode
}

type PhaseProps = {
  onClick: () => void
  phase: PhaseType
  minting: boolean | string
}

const Phases: React.FC<PhasesProps> & {
  Phase: React.FC<PhaseProps>
  PhaseSkeleton: React.FC<{ title: string }>
} = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.title}>Phases</div>
        <div className={styles.phasesContent}>{children}</div>
      </div>
    </div>
  )
}

const PhaseSkeleton: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className={styles.phase}>
      <div className={styles.info}>
        <div className={styles.title}>{title}</div>
        <div className={styles.skeleton} style={{ width: '16%' }} />
        <div className={styles.skeleton} style={{ width: '30%' }} />
        <div className={styles.skeleton} style={{ width: '20%' }} />
      </div>
      <div className={styles.dividerWrapper}>
        <div className={styles.divider} />
      </div>
    </div>
  )
}

const Phase: React.FC<PhaseProps> = (props) => {
  const { phase } = props

  //We can check if the phase is mintable relative to the current wallet
  const disabled = phase.errors.length > 0
  //Set the message as the last error written
  const error = phase.errors[phase.errors.length - 1]
  //useCmv3 provides an array of payments required for each phase
  //Since we only have solPayments on this phase, we can access the first payment object in the array
  const sol = phase.payments[0]
  const price = `${sol.basisPoints / Math.pow(10, sol.decimals)} ${sol.identifier}`

  const PhaseStatus = () => {
    if (phase.startsAt && phase.startsAt > Date.now()) {
      return (
        <>
          Starts in: <Clock startDate={new Date(phase.startsAt)} />
        </>
      )
    }
    if (phase.endsAt && phase.endsAt < Date.now()) {
      return 'Phase concluded'
    }
    return 'Phase Active'
  }

  return (
    <div className={styles.phase}>
      <div className={styles.info}>
        <div className={styles.title}>{phase.label}</div>
        <div className={`${styles.error} ${!error && styles.no_error}`}>{error ? error : 'Ready to mint'}</div>
        <div className={styles.status}>
          <PhaseStatus />
        </div>
        <div className={styles.price}>Price: {price}</div>
        <div className={styles.mint}>
          <Button disabled={props.minting ? true : disabled} onClick={props.onClick}>
            {props.minting ? 'Minting...' : 'Mint'}
          </Button>
        </div>
      </div>
      <div className={styles.dividerWrapper}>
        <div className={`${styles.divider} ${props.minting && styles.divider_loading}`} />
      </div>
    </div>
  )
}

Phases.Phase = Phase
Phases.PhaseSkeleton = PhaseSkeleton

export default Phases
