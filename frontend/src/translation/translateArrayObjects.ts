import axios from "axios";
import { home_new } from "./languages/home_text";

const translateText = async (text: string, sourceLanguage: string, targetLanguage: string) => {
    try {
      const response = await axios.get(
        `https://translation.googleapis.com/language/translate/v2?q=${text}&source=${sourceLanguage}&target=${targetLanguage}&key=AIzaSyAMjXwmyrFo2Y_OVU_JXbXyIrTCZPiFWUs`
      );
  
      return response.data.data.translations[0].translatedText;
    } catch (error) {
      return text;
    }
  };

export async function HomeText(language: any) {
    let lang = "";
    for (const key in home_new) {
      lang += home_new[key] + ":";
    }
    lang = lang.slice(0, -1);
    if (language !== "en") {
      lang = await translateText(lang, "en", language);
    }
    const langArr = lang.split(":");
    const data = {
      "text_start_now": langArr[0] || home_new["text_start_now"],
    }
    return data;
  }
  