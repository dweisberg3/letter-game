import React, { useState } from 'react';
import Section from './Section';
import Switch from '@mui/material/Switch';
import { sections } from '../utils/Constants';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const label = { inputProps: { 'aria-label': 'Switch demo' } };
interface BoardProps {
  handleIndexSelect:(index:number) => void;
  handleIsCumulative:(isCumulative:boolean) => void;
  handleContinue: ()=>void;

}
const Board: React.FC<BoardProps> = ({handleIndexSelect,handleIsCumulative,handleContinue}) => {
  const [isCumulative, setIsCumulative] = useState<boolean>(false);
  const [selectedSectionIndex,setSelectedSectionIndex] = useState<number>(-1);
  const navigate = useNavigate();

  const handleSectionClick = (index: number) => {
    setSelectedSectionIndex(index)
    handleIndexSelect(index)
  };

  const handleContinueClick = () => {
    console.log(isCumulative, '     ', selectedSectionIndex);
    handleContinue();
    navigate('/game'); // Navigate to the Game route
  };

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCumulative(event.target.checked)
    handleIsCumulative(event.target.checked)
  };

  return (
    <div className="board">
      {sections.map((section, index) => (
        <Section 
          key={index} 
          letters={section.letters.map((el) => el['pngfilePath'])} 
          color={section.color} 
          onClick={() => handleSectionClick(index)} 
          selected={selectedSectionIndex === index || (isCumulative && index < selectedSectionIndex)} 
          
        />
      ))}
       <button onClick={handleContinueClick} disabled={selectedSectionIndex < 0}>
        Continue
      </button>

          <Typography variant="body1">Cumulative</Typography>
      <Switch
        // checked={isEnabled}
        onChange={handleToggle}
        color="primary"
      />
    </div>
    
  );
};

export default Board;
