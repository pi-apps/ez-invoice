
import styled from "styled-components";
import React from "react";
import { Flex, Text, Button } from "@devfedeltalabs/pibridge_uikit";

export interface Props {
  isAuthencation:boolean
}


export const AlertLoginModal = ({ isAuthencation }) => {
  if ( isAuthencation ) {
    return(
      <ModalWrapper>
          <Text>kagsdkabsdk</Text>
      </ModalWrapper>
    )
  }
  return null
  
}
export default AlertLoginModal

const ModalWrapper = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 101;
  background: rgba(220, 224, 225, 0.601);
`;