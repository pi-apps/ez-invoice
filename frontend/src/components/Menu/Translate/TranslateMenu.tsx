import { AutoRenewIcon, Button, Flex, Text, useModal } from "@devfedeltalabs/pibridge_uikit";
import { useDispatch } from "react-redux";
import { AppDispatch } from "state";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Languages from "./Languages.json";
import { Translate } from "react-auto-translate";
import Langauges from './Languages.json'
import { axiosClient } from "config/htttp";
import { getAccessToken, getUser } from "state/user";
import { setUser } from "state/user/actions";
import { LanguagesContext } from "contexts/Translate";
import useToast from "hooks/useToast";

const TranslateMenu = () => {
  const dispatch = useDispatch<AppDispatch>()
  const DataAb = getUser();
  const languageUserApi = DataAb?.language
  
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [nameCountryLanguage, setNameCountryLanguage] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const token = getAccessToken()
  const { language, setLanguage } = useContext(LanguagesContext);

  const changeLanguageUser = async (data) => {
    setIsLoading(true)
    const dataBody = {
      language: `${data}`
    }
    try {
      const res = await axiosClient.post('/user/update', dataBody, {
        headers: {
          "Authorization": token
        }
      })
      dispatch(setUser(res?.data));
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

    useEffect(() => {
      if (languageUserApi) {
        const found1 = Langauges.filter(element => element.code === languageUserApi);
        setNameCountryLanguage(found1[0].name)
      }
    }, [languageUserApi])

  return (
    <Flex position="relative">  
      <ImageContainer
        onClick={() => setIsShowMenu(!isShowMenu)}
        endIcon={isLoading ? <AutoRenewIcon style={{margin: 0}} spin color="black"/> :
         <>
            { languageUserApi && nameCountryLanguage ? (
              <TextLanguage>
                <Translate>
                  {nameCountryLanguage}
                </Translate>
              </TextLanguage>
            ) : (
              <TextLanguage>English</TextLanguage>
            )}
         </>
        }
      />
      {isShowMenu && (
        <ListTranslate>
          <ContainerList>
            {Languages.map((item: any, index) => (
              <FlexButtonChooseLg key={item?.index}>
                <ButtonChooseLg
                  onClick={() => {
                    setIsShowMenu(!isShowMenu);
                    changeLanguageUser(item.code)
                    setLanguage(item.code)
                  }}
                >
                  {item.name}
                </ButtonChooseLg>
              </FlexButtonChooseLg>
            ))}
          </ContainerList>
        </ListTranslate>
      )}
    </Flex>
  );
};

const Image = styled.img`
  width: 28px;
  height: 28px;
`;

const ImageContainer = styled(Button)`
  padding: 0px 15px;
  width: 90px;
  height: 28px;
  background: #f8f5ff;
  border-radius: 6px;
  margin-right: 10px;
`;

const TextLanguage = styled(Text)`
  font-family: "Manrope";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 170%;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.2px;
  color: #6b39f4;
`;

const ListTranslate = styled(Flex)`
  position: absolute;
  overflow-y: scroll;
  overflow-x: hidden;
  position: absolute;
  width: 220px;
  gap: 5px;
  height: 160px;
  left: -95px;
  top: 33px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  background: #e6e6e6;
  border-radius: 6px;
  z-index: 999;
`;

const ContainerList = styled(Flex)`
  position: absolute;
  overflow-y: scroll;
  overflow-x: hidden;
  position: absolute;
  width: 220px;
  gap: 5px;
  height: 150px;
  left: 0;
  top: 0;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  background: #e6e6e6;
  border-radius: 6px;
  padding: 10px 0px;
`;

const ButtonChooseLg = styled(Button)`
  background-color: transparent;
  font-family: "Manrope";
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 170%;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.2px;

  color: #6b39f4;
`;

const FlexButtonChooseLg = styled(Flex)`
  width: auto;
  height: 28px;
  background: #f8f5ff;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
`;

export default TranslateMenu;
