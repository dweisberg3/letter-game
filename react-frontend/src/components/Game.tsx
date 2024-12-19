import React, { useState, useEffect } from 'react';
import { sections ,host_api} from '../utils/Constants';
import Timer from './Timer';
import './Game.css';
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
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
  const [isActive, setIsActive] = useState(false);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [points, setPoints] = useState<number>(0);
  const [playerLost, setPlayerLost] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0); // Gets set when user clicks on letter num challenge
  const [attempts, setAttempts] = useState(0) 
  const [numOfLetters, setNumOfLetters] = useState<number>(0); // Strictly type as number
  const [soundClipIndexArr, setSoundClipIndexArr] = useState<number[]>([])
  const [currIndex, setCurrIndex] = useState<number>(0)
  const [showMessage, setShowMessage] = useState(false);
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
  const getStyle = (isclicked: boolean) => {
    return {
      display: 'flex',
      justifyContent: 'center',
      cursor: isActive ? 'pointer' : 'default',
      alignItems: 'center',
      // width: '50px',
      // height: '50px',
      // fontSize: '24px',
      backgroundColor: isActive ? 'white' : 'light grey',
      borderRadius: '5px',
      border: isclicked ? '4px solid darkgrey' : '1px solid black',
    }
  }

  const sendData = async (lostSingleLetterGame: boolean) => {
    const data = {
      username: playerUsername,
      points: points,
      letter_level: numOfLetters,
      selected_sections_index:selectedSectionsIndex,
      is_cumulative : isCumulative,
      lost_single_letter_game: lostSingleLetterGame
    };

    try {
      const response = await fetch(`${host_api}/gameover`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log(result)
    } catch (error) {
      console.error('Error sending data:', error);
    }
  }

  const setGameOver = (endedEarly:boolean) => {
    setIsActive(!isActive)
    setPoints(0)
    // user would not get here if game was single letter and there was one miss 
    if(!endedEarly){
      sendData(false)
    }
  }
  const handleChange = (event: SelectChangeEvent<number>) => {
    setNumOfLetters(Number(event.target.value)); // Ensure the value is converted to number
    switch (Number(event.target.value)) {
      case 1:
        setTimeLeft(45) // 
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


  const delay = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        setIsAnswerCorrect(null)
        const audioArr = soundClipIndexArr.map(index => new Audio(allLetters[index]['audiofilePath']));
        const playAllAudio = async () => {
          for (const audio of audioArr) {
            await playAudio(audio);
            await delay(500)
          }
        };
        playAllAudio();
      }, 500); // 500 milliseconds = 0.5 seconds

    }
  }, [attempts]);

  useEffect(() => {
    if (isAnswerCorrect !== null) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 500); // Hide after 0.5 seconds

      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [isAnswerCorrect,attempts]);


  const playAudio = (audio: HTMLAudioElement) => {
    return new Promise<void>((resolve) => {
      audio.play();
      audio.onended = () => resolve();
    });
  };


  const handleLetterClick = (letter: string, index: number) => {

    setClickedIndex(index);
    setTimeout(() => setClickedIndex(null), 100); // Border visible for 100ms
    if (letter === allLetters[soundClipIndexArr[currIndex]]['unicode']) {
      setPoints(points => points += 10)
      if (currIndex === soundClipIndexArr.length - 1) {
        setAttempts((attempts)=> attempts+1)
        setIsAnswerCorrect(true)
        setSoundClipIndexArr(Array.from({ length: Number(numOfLetters) }, () => Math.floor(Math.random() * allLetters.length)));
        setCurrIndex(0)
        setAttempts(prev => prev + 1)
      }
      else {
        setIsAnswerCorrect(true)
        setCurrIndex(currIndex => currIndex += 1)
      }

    }
    else {
      setIsAnswerCorrect(false)
      if(numOfLetters === 1){
        setIsActive(!isActive)
        setPlayerLost(!playerLost)
        sendData(true)
      }
      else{
        
        if (currIndex === soundClipIndexArr.length - 1) {
          setSoundClipIndexArr(Array.from({ length: Number(numOfLetters) }, () => Math.floor(Math.random() * allLetters.length)));
          setCurrIndex(0)
          setAttempts(prev => prev + 1)
        }
        else{
          setCurrIndex(currIndex => currIndex += 1)
        }
       
      }
      
    }
  };

  return (
    <div className="game">
      <div className="center-div">{isActive && (<Timer  timeLeft={timeLeft} setGametimeExpired={setGameOver} />)}</div>
      <div style= {{ position:"fixed", top:"5%", left:"37%", padding:"10px"}}
          >{!isActive && (<>
        <FormControl fullWidth variant="outlined" sx={{ minWidth: 20,marginBottom: 1 }}>
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
                sx={{justifyContent:"center", fontSize: '0.75rem', padding: '6px 6px', minWidth: '80px' }} 
                disabled={numOfLetters === 0}> 
          Start
        </Button>
                     </>)}
      </div>
      <Button 
          variant="contained" 
          color="secondary" 
          onClick={handleGoBack}
          style= {{ position:"fixed", bottom:"20px", left:"50px", marginLeft:"20px" }}
        >
          Back to Board</Button>
    
      <div>{selectedSections.map((section) => (
        <div className={section.css_id} >
          {section.letters.map((letter, index) => {
            // const combinedStyle = { ...divStyles, backgroundColor: section.color };
            const isClicked = index === clickedIndex;
            const thestyle = getStyle(isClicked)
            const combinedStyle = { ...thestyle};
            return (
              <div
                key={index}
                style={combinedStyle}
                onClick={() => isActive ? handleLetterClick(letter['unicode'], index) : null}
              >
                <img src={letter['pngfilePath']} style={{ width: '100px', height: '150px' }}  />
              </div>
            )
          })}
        </div>))}
      </div>
      {showMessage && <h3 style={{ color: isAnswerCorrect ? 'green' : 'red' }}>{isAnswerCorrect ? 'Correct' : 'Incorrect'}</h3>}
          {isActive && (
      <Typography component="span" 
                  color="primary" 
                  variant="body1"
                  sx= {{ position:"fixed", bottom:"5%", right:"8%" , color: 'black', 
                  fontSize: '24px', 
                  fontWeight: 'bold' }}>
      Points: {points}
    </Typography>)}
    
     
    </div>
  );
};

export default Game;
