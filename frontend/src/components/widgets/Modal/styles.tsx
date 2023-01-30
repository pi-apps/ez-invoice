import React from "react";
import styled from "styled-components";
import { ModalProps, IconButton, ArrowBackIcon, CloseIcon, Flex } from "@phamphu19498/pibridge_uikit";
import { MotionBox } from "components/Box/Box";

export const ModalHeader = styled.div<{ background?: string }>`
  align-items: center;
  display: flex;
  padding: 24px 24px 0px 24px;
  background: ${({ theme }) => theme.colors.background} !important;
  /* position: relative; */
`;

export const ModalTitle = styled(Flex)`
  align-items: center;
  flex: 1;
  justify-content: center;
  color: #23262f;
  font-weight: 600;
  font-size: 24px;
  line-height: 36px;
  gap: 10px;
  padding-top:5px;
`;

export const ModalBody = styled(Flex)`
  flex-direction: column;
  max-height: 80vh;
  overflow-y:auto;
  padding:24px!important;
  &::-webkit-scrollbar-thumb {
    display: none;
  }
`;
export const ModalBodyV2 = styled(Flex)`
  flex-direction: column;
  max-height: 100vh;
  overflow-y:auto;
  padding:0px!important;
  &::-webkit-scrollbar-thumb {
    display: none;
  }
`;

export const WrapIconButton = styled(IconButton)`
  position: absolute;
  top: 15px;
  right: 15px;
  background: black !important;
  border-radius: 50%;
  height: 40px;
  width: 40px;

  svg {
    fill: #fff;
    width: 25px;
  }
`;

export const ModalCloseButton: React.FC<{ onDismiss: ModalProps["onDismiss"] }> = ({ onDismiss }) => {
  return (
    <WrapIconButton variant="text" onClick={onDismiss} aria-label="Close the dialog" style={{zIndex: '1'}}>
      <CloseIcon color="white" />
    </WrapIconButton>
  );
};

export const ModalBackButton: React.FC<{ onBack: ModalProps["onBack"] }> = ({ onBack }) => {
  return (
    <IconButton variant="text" onClick={onBack} area-label="go back" mr="8px">
      <ArrowBackIcon color="white" />
    </IconButton>
  );
};

export const ModalContainer = styled(MotionBox)<{ minWidth: string }>`
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0px 20px 36px -8px rgba(14, 14, 44, 0.1), 0px 1px 1px rgba(0, 0, 0, 0.05);
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: 20px;
  width: 100%;
  max-height: 100vh;
  z-index: ${({ theme }) => theme.zIndices.modal};
  ${({ theme }) => theme.mediaQueries.xs} {
    width: auto;
    min-width: ${({ minWidth }) => minWidth};
    max-width: 100%;
  }
  padding:0px;
  padding-top:1rem;
  @media screen and (max-width: 500px) {
    padding: 0px;
  }
`;
export const ModalCloseButtonUnbox: React.FC<{ onDismiss: ModalProps["onDismiss"] }> = ({ onDismiss }) => {
  return (
    <Cusbutton variant="text" onClick={onDismiss} aria-label="Close the dialog">
      <CloseIcon color="#ffffff" />
    </Cusbutton>
  );
};

const Cusbutton = styled(IconButton)`
    position: absolute;
    top: 0px;
    right: 0px;
    background: black;
    border-radius: 50%;
    height: 40px;
    width: 40px;
    z-index: 99;
`
