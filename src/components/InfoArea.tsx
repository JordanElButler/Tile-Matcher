import React from 'react';
import '../App.css';

function InfoArea({mistakes}: {mistakes: number}) {

  return (
    <div 
    className={'info-area'}>
      {`Mistakes made: ${mistakes}`}
    </div>
  )
  
}
export default InfoArea;