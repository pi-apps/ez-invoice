import axios from "axios";
const APIKEY_GOOGLE = process.env.REACT_APP_APIKEY_GOOGLE

export const GetTranslateHolder = async (data, language) => {
  try {
    const response = await axios.get(
      `https://translation.googleapis.com/language/translate/v2?source=en&target=${language}&key=${APIKEY_GOOGLE}&q=${data}&format=text`, {headers: {}}
    );
    const res = response?.data?.data?.translations[0]?.translatedText;
    return res;
    // console.log("res11", response?.data?.data?.translations[0]?.translatedText);
  } catch (error) {
    console.log(error)
  }
};
