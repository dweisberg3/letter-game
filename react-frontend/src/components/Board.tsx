import React, { useContext, useState } from 'react';
import Section from './Section';
import { NavigationContext } from '../NavigationContext';
import { sections } from '../utils/Constants';


const Board: React.FC = () => {
  const navigation = useContext(NavigationContext);
 

  // const divStyles = {
  //   color: 'blue'
   
  // }



  const handleSectionClick = (index: number) => {
    navigation?.toggleSection(index);
  };

  const handleContinueClick = () => {
    navigation?.navigateToGame();
  };

  const handleClick = async () => {
    const response = await fetch('http://127.0.0.1:5000/click');
    const data = await response.json();
    alert(data.message);
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
          selected={!!navigation?.selectedSections.includes(index)} 
          
        />
      ))}
       <button onClick={handleContinueClick} disabled={navigation?.selectedSections.length === 0}>
        Continue
      </button>
      <button onClick={handleClick}>click here</button>
    </div>
  );
};

export default Board;
