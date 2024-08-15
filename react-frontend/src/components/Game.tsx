import React, { useState, useEffect, useContext } from 'react';
import { NavigationContext } from '../NavigationContext';
import { sections } from '../utils/Constants';
import Timer from './Timer';

interface GameProps {
  sectionIndex: number;
}

const Game: React.FC<GameProps> = ({ sectionIndex }) => {
  const section = sections[sectionIndex];
  const [currentLetterIndex, setCurrentLetterIndex] = useState(Math.floor(Math.random() * section.letters.length));
  const [correctAnswers, setCorrectAnswers] = useState<Set<string>>(new Set());
  const navigation = useContext(NavigationContext);
  const [attemptsRemaining, setAttemptsRemaining] = useState(10);
  const [isActive, setIsActive] = useState(true);
  const [timeLeft, setTimeLeft] = useState(10); // 2 minutes

  const divStyles = {
    display: 'flex',
    justifyContent: 'center',
    cursor: correctAnswers.size < section.letters.length && isActive ? 'pointer' : 'default',
    alignItems: 'center',
    width: '50px',
    height: '50px',
    fontSize: '24px',
    backgroundColor: correctAnswers.size < section.letters.length ? 'white' : 'light grey',
    border: '1px solid black',
    borderRadius: '5px',
   
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  
  useEffect(() => {
    if (timeLeft === 0) {
      setIsActive(false);
    }
  }, [timeLeft]);

  useEffect(() => {
    console.log(correctAnswers.size === section.letters.length)
    if (currentLetterIndex < section.letters.length) {
      const audio = new Audio(section.letters[currentLetterIndex]['audiofilePath']);
     
      audio.play().catch(error => {
        console.error("Error playing the audio:", error);

    });
    }
  }, [attemptsRemaining, section.letters]);

  const handleLetterClick = (letter: string) => {
    if(attemptsRemaining===1){
      setIsActive(false)
    }
    if (letter === section.letters[currentLetterIndex]['unicode']) {
     
      setCorrectAnswers((prevSet) => new Set(prevSet).add(letter))
      if(correctAnswers.size === section.letters.length){
        
      }
    }
    else{
      setIsActive(false)
    } 
    setAttemptsRemaining(attemptsRemaining-1)
    setCurrentLetterIndex(Math.floor(Math.random() * section.letters.length))
    console.log(correctAnswers)
  };

   

  return (
    <div className="game">
       <Timer timeLeft={timeLeft} />
      <button onClick={navigation?.navigateToBoard}>Go Back to Selection Page</button>
      <h1>Click the correct letter</h1>
      <div className="letters">
        {section.letters.map((letter, index) => (
          <div 
            key={index} 
           style={divStyles}
            onClick={() => correctAnswers.size < section.letters.length && isActive ? handleLetterClick(letter['unicode']): null}
          >
            {letter['unicode']}
          </div>
        ))}
      </div>
      {correctAnswers.size === section.letters.length && (
        <div>
          Well done! You've completed this section.
          <button onClick={navigation?.navigateToBoard}>Back to Board</button>
        </div>
      )}
        {!isActive && (
        <div>
          You need to try the game again!
          <button onClick={()=> {setAttemptsRemaining(10); setIsActive(true)}}>Try Again</button>
        </div>
      )}
      {correctAnswers.size < section.letters.length && (
         <ul>
         {[...correctAnswers].map((item, index) => (
           <li key={index}>{item}</li>
         ))}
       </ul>
      )}
    </div>
  );
};

export default Game;
