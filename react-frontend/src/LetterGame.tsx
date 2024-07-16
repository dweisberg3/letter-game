// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import Board from './components/Board.tsx'

// function App() {
//   const [count, setCount] = useState(0)

  
//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card"> 
//       <Board></Board>
       
       
//       </div> 
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
    
//     </>
//   )
// }

// export default App

import React, { useState, useEffect } from 'react';
import './LetterGame.css';
import audioA from './aFile.wav'; // Add audio files for all letters
import audioB from './bFile.wav';
import audioC from './cFile.wav';
import audioD from './dFile.wav';
import audioE from './eFile.wav';
import audioF from './fFile.wav';
import audioG from './gFile.wav';
import audioH from './hFile.wav';

const letters : string[] = 'ABCDEFGH'.split('');

const audioFiles = {
  A: new Audio(audioA),
  B: new Audio(audioB),
  C: new Audio(audioC),
  D: new Audio(audioD),
  E: new Audio(audioE),
  F: new Audio(audioF),
  G: new Audio(audioG),
  H: new Audio(audioH)
  // Add more letters here
};

function LetterGame() {
  const [currentLetter, setCurrentLetter] = useState(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState({ letter: null, isCorrect: false });

  useEffect(() => {
    playRandomLetter();
  }, []);

  const playRandomLetter = () => {
    const randomLetter :any = letters[Math.floor(Math.random() * letters.length)];
    setCurrentLetter(randomLetter);
    const file : any = audioFiles[randomLetter]
    audioFiles[randomLetter].play();
    setFeedback({ letter: null, isCorrect: false });
  };

  const handleLetterClick = (letter:any) => {
    const isCorrect = letter === currentLetter;
    setFeedback({ letter, isCorrect });

    if (isCorrect) {
      setScore(score + 1);
    }

    setTimeout(playRandomLetter, 1000);
  };

  function startGame(){
    setScore(0)
    playRandomLetter();
    console.log("Lets Go!")
  }

  return (
    <div className="App">
      <h1>Alphabet Pronunciation Game</h1>
      <button onClick={startGame}>Start Game</button>
      <h2>Score: {score}</h2>
      <div className="board">
        {letters.map((letter) => (
          <button
            key={letter}
            className={`letter-button ${feedback.letter === letter ? (feedback.isCorrect ? 'correct' : 'incorrect') : ''}`}
            onClick={() => handleLetterClick(letter)}
          >
            {letter}
            {feedback.letter === letter && (
              <span className="feedback-mark">
                {feedback.isCorrect ? '✔️' : '❌'}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default LetterGame;