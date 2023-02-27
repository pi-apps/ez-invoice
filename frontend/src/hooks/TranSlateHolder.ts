import axios from "axios";
import useToast from "./useToast";
const APIKEY_GOOGLE = process.env.APIKEY_GOOGLE

interface WindowWithEnv extends Window {
  __ENV?: {
    backendURL: string, // REACT_APP_BACKEND_URL environment variable
    sandbox: "true" | "false", // REACT_APP_SANDBOX_SDK environment variable - string, not boolean!
    googleApi: string, // REACT_APP_GOOGLE_API environment variable
  }
}

export const GetTranslateHolder = async (dataText, language) => {
  const _window: WindowWithEnv = window;
  const googleApi = _window.__ENV && _window.__ENV.googleApi;
  
  if (language !== 'en') {
    try {
      const response = await axios.get(
        `https://translation.googleapis.com/language/translate/v2?source=en&target=${language}&key=${googleApi}&q=${dataText}&format=text`, {headers: {}}
      );
      const res = response?.data?.data?.translations[0]?.translatedText;
      return res;
    } catch (error) {
      console.log(error)
    }
  } return dataText;

};
