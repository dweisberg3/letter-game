import { useState } from 'react'
import LetterBox from './LetterBox';

function Board(){

    const [state, setState] = useState(0);

    const handleClick = () => {
      setState(state + 1); // Update the state to trigger a re-render
    };
    // const letters : string[] = ['a','b', 'c', 'd'];
    const letters : string [] = [
        "א", // Aleph
        "ב", // Bet
        "ג", // Gimel
        "ד", // Dalet
        "ה", // He
        "ו", // Vav
        "ז", // Zayin
        "ח", // Chet
        "ט", // Tet
        "י", // Yod
        "כ", // Kaf
        "ך", // Final Kaf
        "ל", // Lamed
        "מ", // Mem
        "ם", // Final Mem
        "נ", // Nun
        "ן", // Final Nun
        "ס", // Samekh
        "ע", // Ayin
        "פ", // Pe
        "ף", // Final Pe
        "צ", // Tsadi
        "ץ", // Final Tsadi
        "ק", // Qof
        "ר", // Resh
        "ש", // Shin
        "ת"  // Tav
      ];
    const shuffle = ([...arr]) => {
      let m = arr.length;
      while (m) {
        const i = Math.floor(Math.random() * m--);
        [arr[m], arr[i]] = [arr[i], arr[m]];
      }
      return arr;
    };

    
   
      return <><button onClick={handleClick}>Clear Board</button>
       {shuffle(letters).map((letter) =>  <LetterBox  letter= {letter}  ></LetterBox>)}
      </>

}
export default Board;