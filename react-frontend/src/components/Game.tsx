import React, { useState, useEffect, useContext, useRef } from 'react';
import { NavigationContext } from '../NavigationContext';
import { sections } from '../utils/Constants';
import Timer from './Timer';

interface GameProps {
  sectionIndex: number[];
}

const Game: React.FC<GameProps> = () => {
  const navigation = useContext(NavigationContext);
  const selectedSectionsIndex = navigation?.selectedSections || [];
  const allLetters = selectedSectionsIndex.flatMap(index => sections[index].letters);
  const selectedSections = sections.filter((_, index) => selectedSectionsIndex.includes(index));
  const [currentLetterIndex, setCurrentLetterIndex] = useState(Math.floor(Math.random() * allLetters.length));
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null); // Track correct answers
  // const [correctAnswers, setCorrectAnswers] = useState<Set<string>>(new Set());
  const [isActive, setIsActive] = useState(false);
  const correctAnswers = useRef<Set<string>>(new Set());
  const [playerWon, setPlayerWon] = useState(false)
  const [playerLost, setPlayerLost] = useState(false)
  const [timeLeft, setTimeLeft] = useState(100); // 2 minutes
  const [attempts, setAttempts] = useState(0)
  const divStyles = {
    display: 'flex',
    justifyContent: 'center',
    cursor: correctAnswers.current.size < allLetters.length && isActive ? 'pointer' : 'default',
    alignItems: 'center',
    width: '50px',
    height: '50px',
    fontSize: '24px',
    backgroundColor: correctAnswers.current.size < allLetters.length ? 'white' : 'light grey',
    border: '1px solid black',
    borderRadius: '5px',

  }


  const setGameOver = () => {
    setIsActive(!isActive)
  }

  const startgame = () => {
    
    setIsActive(!isActive)
    setAttempts(prev=> prev + 1)
  }

  // const getLetter =
  //   setTimeout(() => {
  //     const audio = new Audio(allLetters[currentLetterIndex]['audiofilePath']);

  //     audio.play().catch(error => {
  //       console.error("Error playing the audio:", error);

  //     });
  //   }, 500); // 500 milliseconds = 0.5 seconds

  


  // useEffect(() => {
  //   if (timeLeft === 0) {
  //     setIsActive(false);
  //   }
  // }, [timeLeft]);



  useEffect(() => {
    if (isActive) {
      // 
      // audio.play()
      // console.log("inside the useeffect")
      setTimeout(() => {
        setIsAnswerCorrect(null)
        const audio = new Audio(allLetters[currentLetterIndex]['audiofilePath']);
        audio.play().catch(error => {
          console.error("Error playing the audio:", error);

        });
      }, 500); // 500 milliseconds = 0.5 seconds

    }
  }, [attempts]);
  

  const handleLetterClick = (letter: string) => {
    
    if (letter === allLetters[currentLetterIndex]['unicode']) {
      correctAnswers.current = new Set(correctAnswers.current).add(letter)
      setIsAnswerCorrect(true)
      if (correctAnswers.current.size === allLetters.length) {
        setIsActive(!isActive)
      }
      else {
        console.log("got here!")
        setCurrentLetterIndex(Math.floor(Math.random() * allLetters.length))

        setAttempts(prev=> prev + 1)
        return <button style={{color:'green'}}></button>
      }

    }
    else {
      setIsActive(!isActive)
      setPlayerLost(!playerLost)
    }


  };



  return (
    <div className="game">
      <div>{isActive && (<Timer timeLeft={timeLeft} setGametimeExpired={setGameOver} />)}</div>
      <div>{!isActive && (<button onClick={startgame}>Start</button>)}</div>
      <button onClick={navigation?.navigateToBoard}>Go Back to Selection Page</button>
      <span>Click the correct letter</span>
      <div>{selectedSections.map((section) => (
        <div className="letters" style={{margin:'10px'}}>
          {section.letters.map((letter, index) =>  {
            const combinedStyle = { ...divStyles, backgroundColor: section.color };
            return(
            <div
              key={index}
              style={combinedStyle}
              onClick={() => correctAnswers.current.size < allLetters.length && isActive ? handleLetterClick(letter['unicode']) : null}
            >
              {letter['unicode']}
            </div>
          )})}
        </div>))}
      </div>
      {correctAnswers.current.size === allLetters.length && (
        <div>
          Well done! You've completed this section.
          <button onClick={navigation?.navigateToBoard}>Back to Board</button>
        </div>
      )}
      {playerLost && (
        <div>
          You need to try the game again!
          <button onClick={() => { setTimeLeft(100); startgame() }}>Try Again</button>
        </div>
      )}
       {isAnswerCorrect && <h3 style={{ color: 'green' }}>Correct</h3>}
    </div>
  );
};

export default Game;
