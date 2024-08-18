import React, { useEffect, useState } from 'react';
import { formatTime } from '../utils/formatTime';

interface TimerProps {
  timeLeft: number;
  setGametimeExpired:() => void;
}

const Timer: React.FC<TimerProps> = ({ timeLeft,setGametimeExpired }) => {

  const [gameTimeRemaining,setGameTimeRemaining] = useState(timeLeft)

  useEffect(() => {
    const timer = setInterval(() => {
      setGameTimeRemaining(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
      if(gameTimeRemaining === 0){
        setGametimeExpired();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

    


  return (
    <div>
      <h2>{formatTime(gameTimeRemaining)}</h2>
    </div>
  );
};

export default Timer;
