import { Button, Flex, Image, Text } from "@devfedeltalabs/pibridge_uikit";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Translate } from "react-auto-translate";
import { useNavigate } from "react-router-dom";
import { GetTranslateHolder } from "hooks/TranSlateHolder";
import { getUser } from "state/user";

interface SentSuccess {
  setIsSentSuccessfully: (e) => void;
}

const SentInvoiceSuccessfully: React.FC<
  React.PropsWithChildren<SentSuccess>
> = ({ setIsSentSuccessfully }) => {

  const navigate = useNavigate();

  const handleDone = () => {
    setIsSentSuccessfully(false) 
    navigate("/invoice")
  }

  // Translate
  const DataAb = getUser();
  const languageUserApi = DataAb?.language
  const listTextPlaceHolder = {
    sent_invoice_success: "Sent Invoice Successfully",
    done: "Done",
  };
  const [stateText, setStateText] = useState(listTextPlaceHolder);
  const fcTransLateText = async (language) => {
      const resSentSuccess = await GetTranslateHolder(
        listTextPlaceHolder.sent_invoice_success,
        language
      );
      const resDone = await GetTranslateHolder(
        listTextPlaceHolder.done,
        language
      );
    setStateText({
      done: resDone,
      sent_invoice_success: resSentSuccess,
    });
  };

  useEffect(() => {
    if (!languageUserApi) {
      fcTransLateText('en')
    } else fcTransLateText(languageUserApi)
  }, [languageUserApi]);

  return (
    <CsContainer>
      <CsFlex>
        <FlexImage>
          <Image
            src="/images/pisuccess.png"
            alt=""
            width={120}
            height={120}
          />
        </FlexImage>
        <FlexText>
          <TextHeader>
            {stateText.sent_invoice_success}
          </TextHeader>
        </FlexText>
        <Flex width='100%'>
          <CsButton onClick={handleDone}>{stateText.done}</CsButton>
        </Flex>
      </CsFlex>
    </CsContainer>
  );
};

const CsContainer = styled(Flex)`
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 30px;
  @media only screen and (max-width: 600px) {
    padding: 0px 10px;
  }
`;

const CsFlex = styled(Flex)`
  height: calc(100vh - 250px);
  flex-direction: column;
  overflow: scroll;
  padding: 12px;
  width: 100%;
  /* align-items: center; */
  justify-content: center;
`;

const TextHeader = styled(Text)`
  font-family: "Manrope";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 150%;
  text-align: center;
  color: #0f172a;
`;

const FlexImage = styled(Flex)`
  justify-content: center;
  margin-bottom: 40px;
`;

const FlexText = styled(Flex)`
  justify-content: center;
  margin-bottom: 96px;
`;

const CsButton = styled(Button)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  gap: 8px;
  width: 100%;
  height: 56px;
  background: #f8f5ff;
  border-radius: 12px;

  /* body/large/bold */

  font-family: "Manrope";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 165%;
  /* or 26px */

  display: flex;
  align-items: center;
  letter-spacing: 0.4px;

  /* Primary / Base */

  color: #6b39f4;
`;

export default SentInvoiceSuccessfully;
