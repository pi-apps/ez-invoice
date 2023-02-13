import { Flex, Text } from "@phamphu19498/pibridge_uikit";
import React from "react";
import styled from "styled-components";
import { Translate } from "react-auto-translate";
import Card from "./Card";

const ReceiveTab = () => {
  return (
    <CsWrapContainer>
      {[1, 2, 3].map(() => {
        return (
          <CsContent>
            <CsText>
              <Translate>20 October 2022</Translate>
            </CsText>
            {[1, 2, 3].map((_, index) => {
              return <Card index={index + 1} />;
            })}
          </CsContent>
        );
      })}
    </CsWrapContainer>
  );
};

const CsWrapContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 16px;
  overflow: scroll;
  height: calc(100vh - 300px);
`;
const CsContent = styled(Flex)`
  margin-top: 14px;
  flex-direction: column;
`;
const CsText = styled(Text)`
  font-weight: 500;
  font-size: 14px;
  color: #64748b;
`;

export default ReceiveTab;
