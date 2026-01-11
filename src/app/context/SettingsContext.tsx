"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface SettingsContextType {
  isMusicOn: boolean;
  isRainOn: boolean;
  isDrawOn: boolean;
  toggleMusic: () => void;
  toggleRain: () => void;
  toggleDraw: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [isMusicOn, setIsMusicOn] = useState(true);
  const [isRainOn, setIsRainOn] = useState(true);
  const [isDrawOn, setIsDrawOn] = useState(false);

  const toggleMusic = () => setIsMusicOn((prev) => !prev);
  const toggleRain = () => setIsRainOn((prev) => !prev);
  const toggleDraw = () => setIsDrawOn((prev) => !prev);

  return (
    <SettingsContext.Provider
      value={{
        isMusicOn,
        isRainOn,
        isDrawOn,
        toggleMusic,
        toggleRain,
        toggleDraw,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
