import React, { useState, useEffect, useContext } from 'react';
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
  const [correctAnswers, setCorrectAnswers] = useState<Set<string>>(new Set());
  const [isActive, setIsActive] = useState(false);
  const [playerWon, setPlayerWon] = useState(false)
  const [playerLost, setPlayerLost] = useState(false)
  const [timeLeft, setTimeLeft] = useState(100); // 2 minutes
  const [attempts, setAttempts] = useState(0)
  const divStyles = {
    display: 'flex',
    justifyContent: 'center',
    cursor: correctAnswers.size < allLetters.length && isActive ? 'pointer' : 'default',
    alignItems: 'center',
    width: '50px',
    height: '50px',
    fontSize: '24px',
    backgroundColor: correctAnswers.size < allLetters.length ? 'white' : 'light grey',
    border: '1px solid black',
    borderRadius: '5px',

  }


  const setGameOver = () => {
    console.log('game over!!!!')
    setIsActive(!isActive)
  }

  const startgame = () => {
    setIsActive(!isActive)
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
    console.log(correctAnswers.size === allLetters.length)
    if (isActive && !playerWon) {
      
      setTimeout(() => {
        const audio = new Audio(allLetters[currentLetterIndex]['audiofilePath']);

        audio.play().catch(error => {
          console.error("Error playing the audio:", error);

        });
      }, 500); // 500 milliseconds = 0.5 seconds

    }
  }, [isActive, attempts]);
  

  const handleLetterClick = (letter: string) => {
    console.log(`the letter ${letter} and the obj ${JSON.stringify(allLetters[currentLetterIndex])}`)
    if (letter === allLetters[currentLetterIndex]['unicode']) {
      console.log("got ere")
      setCorrectAnswers((prevSet) => new Set(prevSet).add(letter))
      if (correctAnswers.size === allLetters.length) {
        setPlayerWon(!playerWon)
      }
      else {
        setCurrentLetterIndex(Math.floor(Math.random() * allLetters.length))
        setAttempts(attempts => ++attempts)
      }

    }
    else {
      setIsActive(false)
      setPlayerLost(true)
    }


    console.log(correctAnswers)
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
              onClick={() => correctAnswers.size < allLetters.length && isActive ? handleLetterClick(letter['unicode']) : null}
            >
              {letter['unicode']}
            </div>
          )})}
        </div>))}
      </div>
      {correctAnswers.size === allLetters.length && (
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
    </div>
  );
};

export default Game;
