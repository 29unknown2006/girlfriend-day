import React, { createContext, useContext, useState } from 'react';

const DayProgressContext = createContext({
  currentStep: 0,
  game2LoveValue: 50,
  setGame2LoveValue: () => {},
});

export function DayProgressProvider({ children, currentStep }) {
  const [game2LoveValue, setGame2LoveValue] = useState(50);

  return (
    <DayProgressContext.Provider value={{ currentStep, game2LoveValue, setGame2LoveValue }}>
      {children}
    </DayProgressContext.Provider>
  );
}

export function useDayProgress() {
  return useContext(DayProgressContext);
}
