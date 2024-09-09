import React from 'react';
import styles from '../App.module.css';

function InfoArea({mistakes}: {mistakes: number}) {
  return (
    <div className={styles.infoArea}>
      {`Mistakes made: ${mistakes}`}
    </div>
  )
}

export default InfoArea;