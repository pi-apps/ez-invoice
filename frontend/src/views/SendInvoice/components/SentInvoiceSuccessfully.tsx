import { Button, Flex, Image, Text } from "@devfedeltalabs/pibridge_uikit";
import React from "react";
import styled from "styled-components";
import { Translate } from "react-auto-translate";

interface SentSuccess {
  setIsSentSuccessfully: (e) => void;
}

const SentInvoiceSuccessfully: React.FC<
  React.PropsWithChildren<SentSuccess>
> = ({ setIsSentSuccessfully }) => {
  return (
    <CsContainer>
      <CsFlex>
        <FlexImage>
          <Image
            src="/images/imgPi/piSuccess.png"
            alt=""
            width={120}
            height={120}
          />
        </FlexImage>
        <FlexText>
          <TextHeader>
            <Translate>Sent Invoice Successfully</Translate>
          </TextHeader>
        </FlexText>
        <Flex width='100%'>
          <CsButton onClick={() => setIsSentSuccessfully(false)}><Translate>Done</Translate></CsButton>
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
  width: 327px;
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
