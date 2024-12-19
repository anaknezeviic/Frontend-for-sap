import React, { createContext, useContext, useState } from "react";

const CoverageContext = createContext();

export const CoverageProvider = ({ children }) => {
  const [coverages, setCoverages] = useState([]);

  const addCoverage = (coverage) => {
    setCoverages((prevCoverages) => [...prevCoverages, coverage]);
  };

  return (
    <CoverageContext.Provider value={{ coverages, addCoverage }}>
      {children}
    </CoverageContext.Provider>
  );
};

export const useCoverageContext = () => useContext(CoverageContext);
