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
  const [selectedValue, setSelectedValue] = useState<number>(0)
  const [soundClipIndexArr, setSoundClipIndexArr] = useState<number[]>([])
  const [currIndex, setCurrIndex] = useState<number>(0)

  const getStyle = (isclicked:boolean) => {
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
 

  const sendData = async (username:string,points:number, lostSingleLetterGame:boolean) => {
    const data = { username: username,
                  points: points,
                  lostSingleLetterGame : lostSingleLetterGame }; // Replace with your data

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
    sendData('Dovid',points,false) 
  }



  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(Number(event.target.value));
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
   
    console.log(Number(event.target.value))
    console.log(Array.from({ length: Number(event.target.value) }, () => Math.floor(Math.random() * allLetters.length)))
    setSoundClipIndexArr(Array.from({ length: Number(event.target.value) }, () => Math.floor(Math.random() * allLetters.length)));
    // console.log('soundarr',soundClipIndexArr)
    
  }
    const startgame = () => {

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


    const handleLetterClick = (letter: string,index:number) => {

      setClickedIndex(index);
      setTimeout(() => setClickedIndex(null), 100); // Border visible for 100ms
      console.log(`soundClipIndexArr : ${soundClipIndexArr} and currIndex : ${currIndex}`)
      if (letter === allLetters[soundClipIndexArr[currIndex]]['unicode']) {
        setPoints(points => points += 10)
        if (currIndex === soundClipIndexArr.length - 1) {
          setIsAnswerCorrect(true)
          setSoundClipIndexArr(Array.from({ length: Number(selectedValue) }, () => Math.floor(Math.random() * allLetters.length)));
          setCurrIndex(0)
          setAttempts(prev => prev + 1)
        }


        // if (correctAnswers.current.size === allLetters.length) {
        //   setIsActive(!isActive)
        // }
        else {
          console.log("got here!")
          setCurrIndex(currIndex => currIndex += 1)
          // setCurrentLetterIndex(Math.floor(Math.random() * allLetters.length))

        }

      }
      else {
        setIsActive(!isActive)
        setPlayerLost(!playerLost)
        sendData('Dovid',points,true)
      }





    };



    return (
      <div className="game">
        <div>{isActive && (<Timer timeLeft={timeLeft} setGametimeExpired={setGameOver} />)}</div>
        <div>{!isActive && (
          <><label htmlFor="letters">Letters:</label><select id="letters" name="letters" onChange={handleChange}>
            <option value="">Select a value</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select><button onClick={startgame}>Start</button></>)}</div>
        <button onClick={navigation?.navigateToBoard}>Go Back to Selection Page</button>
        <span>Click the correct letter</span>
        <div>{selectedSections.map((section) => (
          <div className="letters" style={{ margin: '10px' }}>
            {section.letters.map((letter, index) => {
              // const combinedStyle = { ...divStyles, backgroundColor: section.color };
              const isClicked = index === clickedIndex;
              const thestyle = getStyle(isClicked)
    
        const combinedStyle = { ...thestyle, backgroundColor: section.color };
              return (
                <div
                  key={index}
                  style={combinedStyle}
                  onClick={() => correctAnswers.current.size < allLetters.length && isActive ? handleLetterClick(letter['unicode'],index) : null}
                >
                 <img src={letter['pngfilePath']} alt="Description of the image" />
                </div>
              )
            })}
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
        <span>Points: {points}</span>
      </div>
    );
  };

  export default Game;
