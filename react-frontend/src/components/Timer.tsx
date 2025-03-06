
import React, { useEffect, useState } from 'react';
import { formatTime } from '../utils/formatTime';
import { Button } from '@mui/material';

interface TimerProps {
  timeLeft: number;
  setGametimeExpired: (endedEarly:boolean) => void;
}

const Timer: React.FC<TimerProps> = ({ timeLeft, setGametimeExpired }) => {
  const [gameTimeRemaining, setGameTimeRemaining] = useState(timeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setGameTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setGametimeExpired(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [setGametimeExpired]);

  return (
    <div>
      <h2 style={{textAlign:"center"}}>{formatTime(gameTimeRemaining)}</h2>
      <Button variant="contained" 
                color="primary" onClick={() => setGametimeExpired(true)} >End Game</Button>
    </div>
  );
};

export default Timer;
