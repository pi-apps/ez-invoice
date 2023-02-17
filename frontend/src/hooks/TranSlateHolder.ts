import axios from "axios";
import { useContext, useState } from "react";

export const GetTranslateHolder = async (data, language) => {
  try {
    const response = await axios.get(
      `https://translation.googleapis.com/language/translate/v2?source=en&target=${language}&key=AIzaSyAMjXwmyrFo2Y_OVU_JXbXyIrTCZPiFWUs=${data}&format=text`
    );
    const res = response?.data?.data?.translations[0]?.translatedText;
    console.log('responseGG', res)
    return res;
    // console.log("res11", response?.data?.data?.translations[0]?.translatedText);
  } catch (error) {
    console.log()
  }

  // .then(function (response) {
  //   console.log(
  //     "g101",
  //     response?.data?.data?.translations[0]?.translatedText
  //   );
  //   const res = response?.data?.data?.translations[0]?.translatedText;
  //   return res;
  // })
  // .catch(function (error) {
  //   console.log(error);
  //   return error;
  // });
};
