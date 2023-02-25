import styled from "styled-components";
import { Translate } from "react-auto-translate";
import { useEffect, useState } from "react";
import { getUser } from "state/user";
import { GetTranslateHolder } from "hooks/TranSlateHolder";

interface Props {
  errors?: any;
  name?: any;
}

function ErrorMessages({ errors, name }: Props) {
  const logerror = errors[name];

   // Translate
   const userData = getUser();
   const languageUserApi = userData?.language
 
   const [stateText, setStateText] = useState({
     errorText: "",
   });

   const fcTransLateText = async (language) => {
     const resStartNow = await GetTranslateHolder(
        logerror.message,
        language
       );
       setStateText({
        errorText: resStartNow,
     });
   };
 
   useEffect(() => {
     if (!languageUserApi) {
       fcTransLateText('en')
     } else fcTransLateText(languageUserApi)
   }, [languageUserApi, logerror]);

  return (
    <ErrorMess>
      {/* {logerror ? <Translate>{logerror && logerror.message}</Translate> : null} */}
      {logerror && stateText.errorText}
    </ErrorMess>
  );
}


const ErrorMess = styled.div`
  color: #ff592c;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.1;
  margin-top: 6px;
`;
export default ErrorMessages;

export const ErrorMessagesV2 = ({ message }) => {
  
  const logerror = message
   // Translate
   const userData = getUser();
   const languageUserApi = userData?.language
 
   const [stateText, setStateText] = useState({
     errorText: "",
   });

   const fcTransLateText = async (language) => {
     const resStartNow = await GetTranslateHolder(
        logerror.message,
        language
       );
       setStateText({
        errorText: resStartNow,
     });
   };
 
   useEffect(() => {
     if (!languageUserApi) {
       fcTransLateText('en')
     } else fcTransLateText(languageUserApi)
   }, [languageUserApi, logerror]);
   console.log("stateText.errorText", logerror)
  return (
    <ErrorMess>
      {/* {logerror ? <Translate>{logerror && logerror.message}</Translate> : null} */}
      {logerror && stateText.errorText}
    </ErrorMess>
  );
}

