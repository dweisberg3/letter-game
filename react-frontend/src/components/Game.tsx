import React, { useState, useEffect, useContext, useRef } from 'react';
import { sections } from '../utils/Constants';
import Timer from './Timer';
import './Game.css'; // Import the CSS file
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface GameProps {
  selectedSectionsIndex: number;
  playerUsername: string;
  isCumulative: boolean;

}
const Game: React.FC<GameProps> = ({ isCumulative, playerUsername, selectedSectionsIndex }) => {
  const navigate = useNavigate();
  const selectedSections = sections.filter((_, index) => {
    if (isCumulative) {
      return index <= selectedSectionsIndex!
    }
    else {
      return index === selectedSectionsIndex
    }
  });
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null); // Track correct answers
  // const [correctAnswers, setCorrectAnswers] = useState<Set<string>>(new Set());
  const [isActive, setIsActive] = useState(false);
  const correctAnswers = useRef<Set<string>>(new Set());
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [points, setPoints] = useState<number>(0);
  const [playerWon, setPlayerWon] = useState(false)
  const [playerLost, setPlayerLost] = useState(false)
  const [timeLeft, setTimeLeft] = useState(100); // 2 minutes
  const [attempts, setAttempts] = useState(0)
  const [numOfLetters, setNumOfLetters] = useState<number>(0); // Strictly type as number
  const [soundClipIndexArr, setSoundClipIndexArr] = useState<number[]>([])
  const [currIndex, setCurrIndex] = useState<number>(0)
  // let  allLetters = selectedSectionsIndex.flatMap(index => sections[index].letters);
  let allLetters = sections[selectedSectionsIndex!].letters
  if (isCumulative) {
    let latest_idx = selectedSectionsIndex! - 1
    while (latest_idx > -1) {
      allLetters = [...allLetters, ...sections[latest_idx].letters]
      latest_idx--
    }
  }

  const handleGoBack = () => {
    navigate('/board')
  }
  console.log(allLetters)
  const getStyle = (isclicked: boolean) => {
    return {
      display: 'flex',
      justifyContent: 'center',
      cursor: correctAnswers.current.size < allLetters.length && isActive ? 'pointer' : 'default',
      alignItems: 'center',
      // width: '50px',
      // height: '50px',
      // fontSize: '24px',
      backgroundColor: correctAnswers.current.size < allLetters.length ? 'white' : 'light grey',
      borderRadius: '5px',
      border: isclicked ? '4px solid darkgrey' : '1px solid black',
    }
  }

  const sendData = async (username: string, points: number, lostSingleLetterGame: boolean) => {
    const data = {
      username: username,
      points: points,
      lostSingleLetterGame: lostSingleLetterGame
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/gameover', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log('Response from Flask:', result);
    } catch (error) {
      console.error('Error sending data:', error);
    }
  }

  const setGameOver = () => {
    setIsActive(!isActive)
    // user would not get here if game was single letter and there was one miss 
    sendData('Dovid', points, false)
  }
  const handleChange = (event: SelectChangeEvent<number>) => {
    setNumOfLetters(Number(event.target.value)); // Ensure the value is converted to number
    switch (Number(event.target.value)) {
      case 1:
        setTimeLeft(45)
        break;
      case 2:
        setTimeLeft(60)
        break;
      case 3:
        setTimeLeft(75)
        break;
      default:
        break;
    }
    setSoundClipIndexArr(Array.from({ length: Number(event.target.value) }, () => Math.floor(Math.random() * allLetters.length)));
  };

  const startgame = () => {
    setPoints(0)
    setIsActive(!isActive)
    setAttempts(prev => prev + 1)
  }

  useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        setIsAnswerCorrect(null)
        const audioArr = soundClipIndexArr.map(index => new Audio(allLetters[index]['audiofilePath']));
        const playAllAudio = async () => {
          for (const audio of audioArr) {
            await playAudio(audio);
          }
        };
        playAllAudio();
      }, 500); // 500 milliseconds = 0.5 seconds

    }
  }, [attempts]);


  const playAudio = (audio: HTMLAudioElement) => {
    return new Promise<void>((resolve) => {
      audio.play();
      audio.onended = () => resolve();
    });
  };


  const handleLetterClick = (letter: string, index: number) => {

    setClickedIndex(index);
    setTimeout(() => setClickedIndex(null), 100); // Border visible for 100ms
    console.log(`soundClipIndexArr : ${soundClipIndexArr} and currIndex : ${currIndex}`)
    if (letter === allLetters[soundClipIndexArr[currIndex]]['unicode']) {
      setPoints(points => points += 10)
      if (currIndex === soundClipIndexArr.length - 1) {
        setIsAnswerCorrect(true)
        setSoundClipIndexArr(Array.from({ length: Number(numOfLetters) }, () => Math.floor(Math.random() * allLetters.length)));
        setCurrIndex(0)
        setAttempts(prev => prev + 1)
      }
      else {
        setCurrIndex(currIndex => currIndex += 1)
      }

    }
    else {
      setIsActive(!isActive)
      setPlayerLost(!playerLost)
      sendData(playerUsername, points, true)
    }
  };

  return (
    <div className="game">
      <div>username :  {playerUsername}</div>
      <div>cumulative :  {isCumulative.toString()}</div>
      <div>index  : {selectedSectionsIndex}</div>
      <div>{isActive && (<Timer timeLeft={timeLeft} setGametimeExpired={setGameOver} />)}</div>
      <div>{!isActive && (<>
        <FormControl fullWidth variant="outlined" sx={{ minWidth: 70,marginBottom: 2 }}>
          <InputLabel id="num-of-letters-label">Letters</InputLabel>
          <Select
            labelId="num-of-letters-label"
            id="num-of-letters"
            value={numOfLetters}
            onChange={handleChange}
            label="Num of Letters"
            sx={{ fontSize: '0.875rem', height: '40px' }}  
          >
            <MenuItem value={0}>
              <em>Select a value</em>
            </MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" 
                color="primary" 
                onClick={startgame} 
                sx={{ fontSize: '0.75rem', padding: '6px 12px', minWidth: '80px' }} 
                disabled={numOfLetters === 0}> 
          Start
        </Button>
                     </>)}
      </div>
      <button onClick={handleGoBack}>Go Back to Selection Page</button>
      <span>Click the correct letter</span>
      <div>{selectedSections.map((section) => (
        <div className={section.css_id} >
          {section.letters.map((letter, index) => {
            // const combinedStyle = { ...divStyles, backgroundColor: section.color };
            const isClicked = index === clickedIndex;
            const thestyle = getStyle(isClicked)
            const combinedStyle = { ...thestyle, backgroundColor: section.color };
            return (
              <div
                key={index}
                style={combinedStyle}
                onClick={() => correctAnswers.current.size < allLetters.length && isActive ? handleLetterClick(letter['unicode'], index) : null}
              >
                <img src={letter['pngfilePath']} style={{ width: '120px', height: '120px' }} alt="Description of the image" />
              </div>
            )
          })}
        </div>))}
      </div>
      {correctAnswers.current.size === allLetters.length && (
        <div>
          Well done! You've completed this section.
          <button onClick={handleGoBack}>Back to Board</button>
        </div>
      )}
      {playerLost && (
        <div>

          <button onClick={() => { setTimeLeft(numOfLetters); startgame() }}>Try Again</button>
        </div>
      )}
      {isAnswerCorrect && <h3 style={{ color: 'green' }}>Correct</h3>}
      <span>Points: {points}</span>
    </div>
  );
};

export default Game;
