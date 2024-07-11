import { useState } from 'react'

function LetterBox({ letter }: { letter: string }){

    const [isRed, setIsRed] = useState(true);

    const handleClick = () => {
      setIsRed(!isRed);
    };
  
    const buttonStyle = {
      backgroundColor: isRed ? 'red' : 'green',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    };

      return <>
      
      <button style={buttonStyle} onClick={handleClick}>
        {letter}
      </button>
      
      </>

}
export default LetterBox;