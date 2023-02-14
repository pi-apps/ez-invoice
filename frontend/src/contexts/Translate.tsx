import { createContext, useState } from "react";

type LanguageType = {
  name?: string;
  code?: string;
};

export type LangaugesType = {
  language: any;
  setLanguage: any;
};

type LangaugesContextProviderType = {
  children: React.ReactNode;
};

export const LanguagesContext = createContext({} as LangaugesType);

export const LanguagesContextProvider = ({
  children,
}: LangaugesContextProviderType) => {
  const [language, setLanguage] = useState<any>(null);
  return (
    <LanguagesContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguagesContext.Provider>
  );
};
