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


  // const selectedSections : any = sections.filter((_,index)=> selectedSections.includes(index))
  console.log("drgdg")

  return (
    <div className="board">
      {sections.map((section, index) => (
        <Section 
          key={index} 
          letters={section.letters.map((el) => el['unicode'])} 
          color={section.color} 
          onClick={() => handleSectionClick(index)} 
          selected={!!navigation?.selectedSections.includes(index)} 
          
        />
      ))}
       <button onClick={handleContinueClick} disabled={navigation?.selectedSections.length === 0}>
        Continue
      </button>
    </div>
  );
};

export default Board;
