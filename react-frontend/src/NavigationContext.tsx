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
  selectedSectionIndex: number;
  isCumulative:boolean;
  navigateToGame: (cumulative:boolean,idx:number) => void;
  navigateToBoard: () => void;
  // toggleSection: (index: number) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedSectionIndex,setSelectedSectionIndex] = useState<number>(-1);
  const [gameOn,setGameOn] = useState<boolean>(false)
  const [isCumulative,setIsCumulative] = useState<boolean>(false)

  const navigateToGame = (cumulative:boolean,sectionIdx:number) => {
    console.log(`bool : ${cumulative} and the idx : ${sectionIdx}`)
    setIsCumulative(cumulative)
    setSelectedSectionIndex(sectionIdx)
    setGameOn(!gameOn)
  };

  const navigateToBoard = () => {
    // setSelectedSections([]);
    setGameOn(!gameOn)
  };

  // const toggleSection = (index: number) => {
  //   setSelectedSections((prev) =>
  //     prev.includes(index)
  //       ? prev.filter((i) => i !== index)
  //       : [...prev, index]
  //   );
  // };

  return (
    <NavigationContext.Provider value={{ gameOn, selectedSectionIndex, isCumulative, navigateToGame, navigateToBoard}}>
      {children}
    </NavigationContext.Provider>
  );
};

export { NavigationContext, NavigationProvider };
