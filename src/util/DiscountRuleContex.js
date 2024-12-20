import React, { createContext, useContext, useState } from "react";

const DiscountRuleContext = createContext();

export const DiscountRuleProvider = ({ children }) => {
  const [discountRules, setDiscountRules] = useState([]);

  return (
    <DiscountRuleContext.Provider value={{ discountRules, setDiscountRules }}>
      {children}
    </DiscountRuleContext.Provider>
  );
};

export const useDiscountRuleContext = () => useContext(DiscountRuleContext);
