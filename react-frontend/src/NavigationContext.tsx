// import React, { createContext, useState, ReactNode } from 'react';

// interface NavigationContextType {
//   sectionIndexs: number| null;
//   navigateToGame: (index: number) => void;
//   navigateToBoard: () => void;
// }

// const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

// const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [sectionIndexs, setSectionIndexs] = useState<number | null>(null);

//   const navigateToGame = (index: number) => {
//     setSectionIndexs(index);
//   };

//   const navigateToBoard = () => {
//     setSectionIndexs(null);
//   };

//   return (
//     <NavigationContext.Provider value={{ sectionIndexs, navigateToGame, navigateToBoard }}>
//       {children}
//     </NavigationContext.Provider>
//   );
// };

// export { NavigationContext, NavigationProvider };


import React, { createContext, useState, ReactNode } from 'react';

interface NavigationContextType {
  gameOn: boolean;
  selectedSections: number[];
  navigateToGame: () => void;
  navigateToBoard: () => void;
  toggleSection: (index: number) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedSections, setSelectedSections] = useState<number[]>([]);
  const [gameOn,setGameOn] = useState(false)
  const navigateToGame = () => {
    if (selectedSections.length > 0) {
      setGameOn(!gameOn)
      // Do nothing if no sections are selected
    }
  };

  const navigateToBoard = () => {
    setSelectedSections([]);
    setGameOn(!gameOn)
  };

  const toggleSection = (index: number) => {
    setSelectedSections((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <NavigationContext.Provider value={{ gameOn, selectedSections, navigateToGame, navigateToBoard, toggleSection }}>
      {children}
    </NavigationContext.Provider>
  );
};

export { NavigationContext, NavigationProvider };
