
import { Flex, Modal, Text, Button, AutoRenewIcon } from "@devfedeltalabs/pibridge_uikit";
import LoginIcon from "components/Svg/Icons/LoginIcon";
import { GetTranslateHolder } from "hooks/TranSlateHolder";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "state/user";
import styled from "styled-components";

interface Props {
    onSignIn?: () => void;
    onDismiss?: () => void;
    isLoading?:boolean
}

export const CsModalLogin: React.FC<Props> = ({onSignIn, onDismiss, isLoading}) => {
    const navigate = useNavigate();
    const DataAb = getUser();
    const languageUserApi = DataAb?.language

    const listTextPlaceHolder = {
      textLogin: "Please login first",
      alertLogin: "You need to login to start using EzInvoice.",
      cancel: "Cancel",
      login: "Login"
    };

    const [stateTextPlaceholder, setStateTextPlaceholder] = useState(listTextPlaceHolder);

    const fcTransLateText = async (language) => {
        const resTextLogin = await GetTranslateHolder(
          listTextPlaceHolder.textLogin,
          language
        );
        const resAlertLogin = await GetTranslateHolder(
          listTextPlaceHolder.alertLogin,
          language
        );
        const resCancel = await GetTranslateHolder(
          listTextPlaceHolder.cancel,
          language
        );
        const resLogin = await GetTranslateHolder(
          listTextPlaceHolder.login,
          language
        );
        
      setStateTextPlaceholder({
        textLogin: resTextLogin,
        alertLogin: resAlertLogin,
        cancel: resCancel,
        login: resLogin
      });
    };
  
    useEffect(() => {
      if (!languageUserApi) {
        fcTransLateText('en')
      } else fcTransLateText(languageUserApi)
    }, [languageUserApi]);
    return(
        <ModalWrapper>
            <Modal
                title=""
                onDismiss={onDismiss}
                maxWidth="550px"
                modalIcon={<LoginIcon />}
            >
                <Flex flexDirection="column" width="100%">
                <Text bold fontSize="18px" width="100%" textAlign="center">
                      {stateTextPlaceholder?.textLogin}
                </Text>
                <Text width="100%" textAlign="center" color="textSubtle" mt="10px">
                    {stateTextPlaceholder?.alertLogin}
                </Text>

                <Flex mt="1rem" justifyContent="space-between">
                    <Button width="48%" variant="secondary" onClick={()=> navigate("/")}>
                        {stateTextPlaceholder?.cancel}
                    </Button>
                    <Button 
                        width="48%" 
                        onClick={onSignIn}
                        disabled={isLoading}
                        endIcon={isLoading ? < AutoRenewIcon color="textDisabled" spin/> : null}
                    >
                        {stateTextPlaceholder?.login}
                    </Button>
                </Flex>
                </Flex>
            </Modal>
        </ModalWrapper>
    )
}

const ModalWrapper = styled.div`
    display: flex;
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
    z-index: ${({ theme }) => theme.zIndices.modal - 1};
    background: rgba(220, 224, 225, 0.601);
`

export const WrapInput = styled.div`
  position: relative;
  margin-bottom: 0rem;
`
export const CustomButton = styled(Button)`
  height: 48px;
  padding: 1px 0;
  font-weight: bold;
  cursor: pointer;
  border: none;
  background-color: ${(props) => props.bgcolor};
  color: ${(props) => props.color};
  width: 250px;
  font-size: 16px;
  margin-bottom: 0;
  box-shadow: none;
  border-radius: 90px;
  @media (max-width: 768px) {
    padding: 1px 20px;
    line-height: 16px;
  }
  @media (max-width: 600px) {
    padding: 0px 20px;
  }
`