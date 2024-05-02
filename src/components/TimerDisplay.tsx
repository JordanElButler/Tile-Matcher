import React, { useEffect } from 'react';
import '../App.css';

// gives a nice view of the timer
function TimerDisplay({count}: {count: number}) {
	
	return (
		<div 
		className={'timer-display'}>
			Watch and Remember! {`${count.toFixed(0)}`}
		</div>
	)
}

export default TimerDisplay;