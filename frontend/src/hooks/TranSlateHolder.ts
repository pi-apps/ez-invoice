import axios from "axios";
import useToast from "./useToast";
const APIKEY_GOOGLE = process.env.APIKEY_GOOGLE

export const GetTranslateHolder = async (dataText, language) => {
  
  if (language !== 'en') {
    try {
      const response = await axios.get(
        `https://translation.googleapis.com/language/translate/v2?source=en&target=${language}&key=${APIKEY_GOOGLE}=${dataText}&format=text`, {headers: {}}
      );
      const res = response?.data?.data?.translations[0]?.translatedText;
      return res;
    } catch (error) {
      console.log(error)
    }
  } return dataText;

};
