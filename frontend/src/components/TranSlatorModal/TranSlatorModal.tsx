import { LanguagesContext } from "contexts/Translate";
import { useContext, useEffect, useState } from "react";
import { Translator } from "react-auto-translate";
import { getUser } from "state/user";

const TranSlatorModal = ({ children }) => {
  const DataAb = getUser();

  // language
  const { language, setLanguage } = useContext(LanguagesContext);
  const languageStorage = localStorage.getItem('language')
  // const getLanguage = async () => {
  //   const data = await localStorage.getItem("language");
  //   setLanguage(data);
  // };
  // useEffect(() => {
  //   getLanguage();
  // }, [language]);

  return (
    <Translator
    from="en"
    to={
      language !== null
        ? language
        : languageStorage ? languageStorage
        : DataAb?.language
        ? DataAb?.language
        : "en"
    }
    googleApiKey="AIzaSyAMjXwmyrFo2Y_OVU_JXbXyIrTCZPiFWUs"
  >
      {children}
    </Translator>
  );
};

export default TranSlatorModal;
