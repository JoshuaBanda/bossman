import React from 'react';
import styles from './styles/card.module.css';

const Card = ({step,procedure}) => {
  return (
    <div className={styles.container}>
        <div className={styles.step}>
            {step}
        </div>
        <div className={styles.procedure}>
            {procedure}
        </div>
    </div>
  )
}

export default Card