import { useState, useContext, useEffect, useRef } from 'react';
import Card from './Card';
import InfoArea from './InfoArea';
import TimerDisplay from './TimerDisplay';
import WinBanner from './WinBanner';
import useAnimationCounter from '../hooks/useAnimationCounter';
import useGame from '../hooks/useGame';
import appConfig from '../config';

import styles from '../App.module.css'

const emojis = [
  '🍀', '🔔','🍒','⚜️', '🍇','💎', '🎱', '🥩',
];
const gridW = 4;
const gridH = 4;


enum UiWaitState {
  None = 'None',
  FlippingOver = 'FlippingOver',
  FlippingBack = 'Flippingback',
}

function CardGrid({remount}: {remount: any}) {
  const appRef = useRef<HTMLDivElement | null>(null);
  const {waitDuration, flipDuration} = appConfig;

  const game = useGame(gridW, gridH, emojis);
  const { openingAnimation, cancelOpeningAnimation, time } = useAnimationCounter(waitDuration);
  const [wait, setWait] = useState<UiWaitState>(UiWaitState.None);
  const [interaction, setInteraction] = useState<boolean>(false);
  const [halfFlip, setHalfFlip] = useState<boolean>(false);

  const width = game.getWidth();
  const height = game.getHeight();
  
  
  const cardi = [];
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const card = game.getCard(j,i);
      const cardEl =
        <Card 
          key={j + '' + i}
          x={j} 
          y={i} 
          emoji={card.getEmoji()}
          over={openingAnimation ? true : card.getOver()}
          flipCard={!interaction || card.getOver() ? null : () => {
            const full = game.choicesFull();
            if (full) return;
            const tryChoice = game.tryChoice(j, i);
            if (tryChoice) setWait(UiWaitState.FlippingOver);
          }}/>
      cardi.push(cardEl);
    }
  }

  useEffect(() => {
    if(wait === UiWaitState.None) return;
    else if(wait === UiWaitState.FlippingOver) {
      const timeoutId = setTimeout(() => {
        const full = game.choicesFull();
        if (full) {
          const match = game.evaluateChoice();
          if (match) {
            game.matchChoices();
            setWait(UiWaitState.None);
            setInteraction(true);
          } else {
            game.rollbackChoices();
            setWait(UiWaitState.FlippingBack);
            setInteraction(false);
          }
        } else {
          setWait(UiWaitState.None);
          setInteraction(true);
        }
      }, flipDuration * 1000);

      return () => clearTimeout(timeoutId);
    }
    else if(wait === UiWaitState.FlippingBack) {
      const timeoutId = setTimeout(() => {
        setWait(UiWaitState.None);
        setInteraction(true);
      }, flipDuration *  1000);
      return () => clearTimeout(timeoutId);
    }
  }, [wait])

  function onClick() {
    if (openingAnimation) {
      setWait(UiWaitState.FlippingBack);
    }
    cancelOpeningAnimation();
  }

  useEffect(() => {
    if ( !openingAnimation && wait === UiWaitState.None) {
      setInteraction(true);
    } else {
      setInteraction(false);
    }
  }, [openingAnimation, wait])
  
  
  const restart = () => {
   
    setInteraction(false);
    if (appRef.current) {
      appRef.current.classList.add(styles.drop); 
    }
    setTimeout(() => {
      remount();
    }, 1000/2);
  }
  
  return (
    <div ref={appRef} className={styles.appContainer}>
      <div className={styles.infoContainer}>
        {openingAnimation ?
          <TimerDisplay count={time} /> : 
           game.checkWinCondition() ?
           <WinBanner /> : 
          <InfoArea mistakes={game.getMistakes()} />
    }     
      </div>
    <div onClick={onClick} className={styles.cardGrid}>
      {cardi}
    </div>
    <button onClick={restart} className={styles.restartBtn}>Restart</button>
    </div>
  )
}

export default CardGrid;