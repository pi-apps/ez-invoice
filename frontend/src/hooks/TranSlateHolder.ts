import axios from "axios";
import { useContext, useState } from "react";

export const GetTranslateHolder = async (data, language) => {
  try {
    const response = await axios.get(
      `https://translation.googleapis.com/language/translate/v2?source=en&target=${language}&key=AIzaSyCGDBWmaZXELZ0joy8LPE5UuXjV4doLXOs&q=${data}&format=text`
    );
    const res = response?.data?.data?.translations[0]?.translatedText;
    return res;
    // console.log("res11", response?.data?.data?.translations[0]?.translatedText);
  } catch (error) {}

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
