import React from 'react';

interface SectionProps {
  letters: string[];
  color: string;
  onClick: () => void;
}

const Section: React.FC<SectionProps> = ({ letters, color, onClick }) => {
  return (
    <div className="section" style={{ backgroundColor: color }} onClick={onClick}>
      {letters.map((letter, index) => (
        <div key={index} className="card">
          {letter}
        </div>
      ))}
    </div>
  );
};

export default Section;
