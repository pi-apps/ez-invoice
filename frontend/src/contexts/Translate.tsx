import React, { createContext, useContext, useState } from "react";

// create a context
export const LanguageContext = createContext({});

// a component that will act as the context provider
export default function LanguageContextProvider({ children }) {
  const [nameLanguage, setNameLanguage] = useState("");

  return (
    <LanguageContext.Provider value={{ nameLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
