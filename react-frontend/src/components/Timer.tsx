import React from 'react';
import { formatTime } from '../utils/formatTime';

interface TimerProps {
  timeLeft: number;
}

const Timer: React.FC<TimerProps> = ({ timeLeft }) => {
  return (
    <div>
      <h2>{formatTime(timeLeft)}</h2>
    </div>
  );
};

export default Timer;
