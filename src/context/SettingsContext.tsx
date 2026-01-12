"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface SettingsContextType {
  isRainOn: boolean;
  isDrawOn: boolean;
  showFluteComponent: boolean;
  showPaintEffect: boolean;
  toggleFluteComponent: () => void;
  toggleRain: () => void;
  toggleDraw: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [isRainOn, setIsRainOn] = useState(true);
  const [isDrawOn, setIsDrawOn] = useState(false);
  const [showFluteComponent, setShowFluteComponent] = useState(true);
  const [showPaintEffect, setShowPaintEffect] = useState(false);

  const toggleFluteComponent = () => setShowFluteComponent((prev) => !prev);
  const toggleRain = () => setIsRainOn((prev) => !prev);
  const toggleDraw = () => {
    const newValue = !isDrawOn;
    setIsDrawOn(newValue);
    setShowPaintEffect(newValue);
  };

  return (
    <SettingsContext.Provider
      value={{
        isRainOn,
        isDrawOn,
        showFluteComponent,
        showPaintEffect,
        toggleFluteComponent,
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
