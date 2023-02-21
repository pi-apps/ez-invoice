import axios from "axios";
import useToast from "./useToast";
const APIKEY_GOOGLE = process.env.REACT_APP_APIKEY_GOOGLE

export const GetTranslateHolder = async (data, language) => {
  
  try {
    const response = await axios.get(
      `https://translation.googleapis.com/language/translate/v2?source=en&target=vi&key=AIzaSyAMjXwmyrFo2Y_OVU_JXbXyIrTCZPiFWUs&q=Down load&format=text`, {headers: {}}
    );
    const res = response?.data?.data?.translations[0]?.translatedText;
    return res;
    // console.log("res11", response?.data?.data?.translations[0]?.translatedText);
  } catch (error) {
    console.log(error)
  }
};
