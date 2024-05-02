import { useState, useContext, useEffect, useRef } from 'react';
import defaultConfig from '../config';
import '../App.css';

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
        myRef.current.classList.remove('rotate');

        setTimeout(() => {
          setShowing(true);
        }, flipDuration * 1000 /2);
      } else {
        myRef.current.classList.add('rotate');

        setTimeout(() => {
          setShowing(false);
        }, flipDuration * 1000/2);
      } 
    }
  }, [over]);
  
  
  const classList = `card rotate-div`;

 
  return (
    <div ref={myRef} onClick={onClick} className={classList} style={style}>
      <div className="card-border-red">
        <div className="card-border-white">
          <div className="card-border-red">
            <div  className={'card-container'}>
              {showing ? emoji : ''}   
                
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Card;