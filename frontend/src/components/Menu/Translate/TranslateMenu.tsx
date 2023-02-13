import { Button, Flex, Text } from "@phamphu19498/pibridge_uikit";
import { log } from "console";
import { LanguageContext } from "contexts/Translate";
import React, { useContext, useState } from "react";
import styled from "styled-components";

const TranslateMenu = () => {
  const [isShowMenu, setIsShowMenu] = useState(true);
  const nameLanguage = useContext(LanguageContext);

  console.log("nameLanguage", nameLanguage);

  return (
    <Flex position="relative">
      <ImageContainer onClick={() => setIsShowMenu(!isShowMenu)}>
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/d/db/Google_Translate_Icon.png"
          alt="translate"
        />
      </ImageContainer>
      {isShowMenu && (
        <ListTranslate>
          <Flex>
            <ButtonChooseLg onClick={() => nameLanguage === "en"}>
              English
            </ButtonChooseLg>
          </Flex>
          <Flex>
            <Text>
              <ButtonChooseLg onClick={() => nameLanguage === "vi"}>
                VietNamese
              </ButtonChooseLg>
            </Text>
          </Flex>
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
