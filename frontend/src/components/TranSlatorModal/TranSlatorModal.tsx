import { LanguagesContext } from "contexts/Translate";
import { useContext, useEffect, useState } from "react";
import { Translator } from "react-auto-translate";
import { getLanguageTrans } from "state/LanguageTrans";
import { getUser } from "state/user";

const APIKEY_GOOGLE = process.env.REACT_APP_APIKEY_GOOGLE

const TranSlatorModal = ({ children }) => {
  const DataAb = getUser();

  // language
  const { language, setLanguage } = useContext(LanguagesContext);
  const languageTransRedux = getLanguageTrans();

  return (
    <Translator
    from="en"
    to={
      language !== null
        ? language
        : languageTransRedux ? languageTransRedux
        : DataAb?.language
        ? DataAb?.language
        : "en"
    }
    googleApiKey={APIKEY_GOOGLE}
  >
      {children}
    </Translator>
  );
};

export default TranSlatorModal;
