import React from 'react';

interface SectionProps {
  letters: string[];
  color: string
  onClick: () => void;
  selected: boolean;
}

const Section: React.FC<SectionProps> = ({ letters, color, onClick, selected }) => {

  const divStyle = {
    backgroundColor: color,
    border: selected ? '4px solid black' : 'none'

  }
  return (
    <div 
      className="section" 
      // style={{ backgroundColor: color, opacity: selected ? 0.5 : 1 }} 
      style={divStyle}
      onClick={onClick}
    >
      {letters.map((letter, index) => (
        <div key={index} >
          
          <img src={letter} style={{width:'100px', height: '100px'}}       alt="Description of the image" />
        </div>
      ))}
    </div>
  );
};

export default Section;
