import { useState, useContext, useEffect, useRef } from 'react';
import defaultConfig from '../config';
import styles from '../App.module.css';

function Card({x, y, emoji, over, flipCard}: {x: number, y: number, emoji: string, over: boolean, flipCard: any}) {

  const { flipDuration } = defaultConfig;
  const myRef = useRef<HTMLDivElement | null>(null);
  
  const [showing, setShowing] = useState<boolean>(over);
  
  const style = {
    gridColumn: x + 1,
    gridRow: y + 1,
    transition: `transform ${flipDuration}s linear`,
  };

  const onClick = () => {
    if (flipCard) flipCard();
    else {console.log('disabled');}
  }
  
  useEffect(() => {
    if (myRef.current) {
      if (over) {
        myRef.current.classList.remove(styles.rotate);

        setTimeout(() => {
          setShowing(true);
        }, flipDuration * 1000 /2);
      } else {
        myRef.current.classList.add(styles.rotate);

        setTimeout(() => {
          setShowing(false);
        }, flipDuration * 1000/2);
      } 
    }
  }, [over]);
  
  
  const classList = `${styles.card} ${styles.rotateDiv}`;

 
  return (
    <div ref={myRef} onClick={onClick} className={classList} style={style}>
      <div className={styles.cardBorderRed}>
        <div className={styles.cardBorderWhite}>
          <div className={styles.cardBorderRed}>
            <div className={styles.cardContainer}>
              {showing ? emoji : ''}   
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card;