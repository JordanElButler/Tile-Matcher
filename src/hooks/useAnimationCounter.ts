import React from 'react';
function useAnimationCounter(duration: number) {

  // show a preview of the cards for around ten seconds or until the user clicks on a card
  // afterwards flip over all the cards. 
  const [ openingAnimation, setOpeningAnimation ] = React.useState(true);
  const [ time, setTime ] = React.useState(duration); // seconds

  const intervalDuration = 1000 / 60;

  // on mounting component
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(oldTime => {
        if (oldTime > 0 && openingAnimation) {
          return oldTime - intervalDuration / 1000;
        }
        else {
          setOpeningAnimation(false);
          clearInterval(intervalId); // not that it really matters
          return 0;
        }
      })
    }, intervalDuration)

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  function cancelOpeningAnimation() {
    setOpeningAnimation(false);
  }

  
  return {
    openingAnimation,
    cancelOpeningAnimation,
    time,
  }
}

export default useAnimationCounter;