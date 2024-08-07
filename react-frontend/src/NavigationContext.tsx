import React, { createContext, useState, ReactNode } from 'react';

interface NavigationContextType {
  sectionIndex: number | null;
  navigateToGame: (index: number) => void;
  navigateToBoard: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sectionIndex, setSectionIndex] = useState<number | null>(null);

  const navigateToGame = (index: number) => {
    setSectionIndex(index);
  };

  const navigateToBoard = () => {
    setSectionIndex(null);
  };

  return (
    <NavigationContext.Provider value={{ sectionIndex, navigateToGame, navigateToBoard }}>
      {children}
    </NavigationContext.Provider>
  );
};

export { NavigationContext, NavigationProvider };
