import React, { createContext, useState, useContext } from "react";

const CarbonFootprintContext = createContext();

export function CarbonFootprintProvider({ children }) {
  const [footprint, setFootprint] = useState(100); // starting points
  const [coins, setCoins] = useState(0);

  // Methods to modify values
  const addFootprint = (value) => setFootprint((prev) => prev + value);
  const reduceFootprint = (value) => setFootprint((prev) => Math.max(0, prev - value));
  const addCoins = (value) => setCoins((prev) => prev + value);
  const spendCoins = (value) => setCoins((prev) => Math.max(0, prev - value));

  return (
    <CarbonFootprintContext.Provider value={{ footprint, coins, addFootprint, reduceFootprint, addCoins, spendCoins }}>
      {children}
    </CarbonFootprintContext.Provider>
  );
}

export function useCarbonFootprint() {
  return useContext(CarbonFootprintContext);
}
