import React, { useContext, useState } from 'react';
import Section from './Section';
import Switch from '@mui/material/Switch';
import { NavigationContext } from '../NavigationContext';
import { sections } from '../utils/Constants';
import Typography from '@mui/material/Typography';

const label = { inputProps: { 'aria-label': 'Switch demo' } };
const Board: React.FC = () => {
  const navigation = useContext(NavigationContext);
  const [isCumulative, setIsCumulative] = useState<boolean>(false);
  const [selectedSectionIndex,setSelectedSectionIndex] = useState<number>(-1);
 

  // const divStyles = {
  //   color: 'blue'
   
  // }



  const handleSectionClick = (index: number) => {
    setSelectedSectionIndex(index)
  };

  const handleContinueClick = () => {
    console.log(isCumulative,'     ',selectedSectionIndex)
    navigation?.navigateToGame(isCumulative,selectedSectionIndex);
  };

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCumulative(event.target.checked)
    console.log('Switch is now', event.target.checked ? 'Enabled' : 'Disabled');
  };


  // const selectedSections : any = sections.filter((_,index)=> selectedSections.includes(index))
  console.log("drgdg")

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
