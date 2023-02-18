import axios from "axios";
import { useContext, useState } from "react";

export const GetTranslateHolder = async (data, language) => {
  console.log('testTrans')
  try {
    const response = await axios.get(
      `https://translation.googleapis.com/language/translate/v2?source=en&target=${language}&key=AIzaSyAMjXwmyrFo2Y_OVU_JXbXyIrTCZPiFWUs&q=${data}&format=text`, {headers: {}}
    );
    const res = response?.data?.data?.translations[0]?.translatedText;
    console.log('responseGG', res)
    return res;
    // console.log("res11", response?.data?.data?.translations[0]?.translatedText);
  } catch (error) {
    console.log('errorGG', error)
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
