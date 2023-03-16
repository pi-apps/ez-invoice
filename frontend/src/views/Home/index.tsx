import { Button, Flex, Text, useModal } from "@devfedeltalabs/pibridge_uikit";
import PageFullWidth from "components/Layout/PageFullWidth";
import styled from "styled-components";
import ReactPlayer from "react-player";
import { Link, useNavigate, NavLink } from "react-router-dom";
import LoginModal from "../../components/LoginModal";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getUser } from "../../state/user";
import { GetTranslateHolder } from "hooks/TranSlateHolder";
import useToast from "hooks/useToast";
import { HomeText } from "../../translation/translateArrayObjects";
import { home_new } from "translation/languages/home_text";
import { tabActiveNewInvoice } from "state/invoice/actions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "state";

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [openLoginModal] = useModal(<LoginModal />);
  const dispatch = useDispatch<AppDispatch>()
  // Translate
  const userData = getUser();
  const languageUserApi = userData?.language

  const [stateText, setStateText] = useState(home_new);
  const requestTrans = async () => {
    try {
      const resData = await HomeText(languageUserApi);
      setStateText(resData)
      console.log('resData', resData)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (languageUserApi) {
      requestTrans();
    } else if (!languageUserApi) {
      setStateText(home_new);
    }
  }, [languageUserApi]);
  async function handleClick() {
    await dispatch(tabActiveNewInvoice({isActive:1}))
    navigate("/newInvoice") 
  }
  return (
    <PageFullWidth>
      <CsContainer>
        <CsCardVideo>
          <ContainerPlayVideo>
            <ReactPlayer
              url="https://youtu.be/UJASg_3arsA"
              width="100%"
              height="100%"
              light="/images/preview.jpg"
              playing={true}
              controls={true}
            />
          </ContainerPlayVideo>
        </CsCardVideo>
        {/* <TranslateButton /> */}
        <Flex width="100%">
          { !userData ?
              <Button
                mt="1.5rem"
                width="100%"
                onClick={openLoginModal}
              >
                {stateText.text_start_now}
              </Button>
          :
            <Button
              mt="1.5rem"
              width="100%"
              onClick={handleClick}
            >
              {stateText.text_start_now}
            </Button>
          }
         
        </Flex>
        <Flex width="100%" mt="1.5rem" justifyContent="center">
          <NavLink to="/policy">
            <CsText>
                  Read Privacy Policy
            </CsText>
          </NavLink>
           
        </Flex>
      </CsContainer>
    </PageFullWidth>
  );
};

export default Home;

const CsContainer = styled(Flex)`
  width: 100%;
  flex-direction: column;
  min-height: 100vh;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: 0px 30px;
  @media only screen and (max-width: 600px) {
    padding: 0px 24px;
    min-height: 80vh;
  }
  @media only screen and (min-width: 768px) {
    max-width: 600px;
    min-height: 80vh;
  }
`;

const CsCardVideo = styled(Flex)`
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  > img {
    border-radius: 12px;
  }
`;
const ContainerPlayVideo = styled(Flex)`
  height: 250px;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
`;
const CsText = styled(Text)`
    cursor: pointer;
    text-decoration: underline;
`