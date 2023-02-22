import { LanguagesContext } from "contexts/Translate";
import { useContext, useEffect, useState } from "react";
import { Translator } from "react-auto-translate";
import { getLanguageTrans } from "state/LanguageTrans";
import { getUser } from "state/user";

const APIKEY_GOOGLE = process.env.REACT_APP_APIKEY_GOOGLE

const TranSlatorModal = ({ children }) => {
  const DataAb = getUser();
  const languageUserApi = DataAb?.language
  const { language } = useContext(LanguagesContext);

  return (
    <Translator
    from="en"
    to={languageUserApi ? languageUserApi : language ? language : "en"}
    // to={"en"}
    googleApiKey="AIzaSyAMjXwmyrFo2Y_OVU_JXbXyIrTCZPiFWUs"
  >
      {children}
    </Translator>
  );
};

export default TranSlatorModal;
