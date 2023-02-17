import { LanguagesContext } from "contexts/Translate";
import { useContext, useEffect, useState } from "react";
import { Translator } from "react-auto-translate";
import { getUser } from "state/user";

const TranSlatorModal = ({ children }) => {
  const DataAb = getUser();
  // const { language, setLanguage } = useContext(LanguagesContext);

  // language
  const [language, setLanguage] = useState("en");
  const getLanguage = async () => {
    const data = await sessionStorage.getItem("language");
    setLanguage(data);
  };
  useEffect(() => {
    getLanguage();
  }, []);

  return (
    <Translator
      from="en"
      to={
        language !== null
          ? language
          : DataAb?.language
          ? DataAb?.language
          : "en"
      }
      googleApiKey="AIzaSyCGDBWmaZXELZ0joy8LPE5UuXjV4doLXOs"
    >
      {children}
    </Translator>
  );
};

export default TranSlatorModal;
