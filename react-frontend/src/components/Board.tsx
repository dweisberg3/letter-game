import React, { useContext } from 'react';
import Section from './Section';
import { NavigationContext } from '../NavigationContext';
import { sections } from '../utils/Constants';


const Board: React.FC = () => {
  const navigation = useContext(NavigationContext);

  const handleClick = (index: number) => {
    navigation?.navigateToGame(index);
  };

  return (
    <div className="board">
      {sections.map((section, index) => (
        <Section 
          key={index} 
          letters={section.letters.map((el) => el['unicode'])} 
          color={section.color} 
          onClick={() => handleClick(index)} 
        />
      ))}
    </div>
  );
};

export default Board;
