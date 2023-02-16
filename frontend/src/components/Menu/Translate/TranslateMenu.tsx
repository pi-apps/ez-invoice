import { Button, Flex, Text, useModal } from "@devfedeltalabs/pibridge_uikit";
import { log } from "console";
import { LanguagesContext } from "contexts/Translate";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import Languages from "./Languages.json";
import ModalLanguages from "./ModalLanguages";

const TranslateMenu = () => {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const { language, setLanguage } = useContext(LanguagesContext);

  console.log("language", language);

  const [openModalLanguages] = useModal(
    <ModalLanguages
      Languages={Languages}
      language={language}
      setLanguage={setLanguage}
    />
  );

  return (
    <Flex position="relative">
      <ImageContainer onClick={openModalLanguages}>
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/d/db/Google_Translate_Icon.png"
          alt="translate"
        />
      </ImageContainer>
      {/* {isShowMenu && (
        <ListTranslate>
          {Languages.map((item: any, index) => (
            <Flex key={item?.index}>
              <ButtonChooseLg onClick={() => nameLanguage === "en"}>
                {item.name}
              </ButtonChooseLg>
            </Flex>
          ))}
        </ListTranslate>
      )} */}
    </Flex>
  );
};

const Image = styled.img`
  width: 28px;
  height: 28px;
`;

const ImageContainer = styled(Button)`
  padding: 0px 15px;
  background-color: transparent;
  height: 28px;
`;

const ListTranslate = styled(Flex)`
  position: absolute;
  top: 35px;
  left: 0;
  background: white;
  display: block;
`;

const ButtonChooseLg = styled(Button)`
  background-color: transparent;
  color: black;
`;

export default TranslateMenu;
