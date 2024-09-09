import React from 'react';
import styles from '../App.module.css';

// gives a nice view of the timer
function TimerDisplay({count}: {count: number}) {
	
	return (
		<div className={styles.timerDisplay}>
			Watch and Remember! {`${count.toFixed(0)}`}
		</div>
	)
}

export default TimerDisplay;