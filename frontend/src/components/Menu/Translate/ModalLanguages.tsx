import { Button, Flex, Modal, Text } from "@phamphu19498/pibridge_uikit";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Translate } from "react-auto-translate";
import styled from "styled-components";
import { useContext } from "react";
import Container from "components/Layout/Container";

interface Props {
  onDismiss?: () => void;
  Languages: any;
  language: any;
  setLanguage: (e: any) => void;
}

const ModalLanguages: React.FC<Props> = ({
  onDismiss,
  Languages,
  language,
  setLanguage,
}) => {
  const { t } = useTranslation();

  return (
    <CsModal title="" onDismiss={onDismiss} maxWidth="550px">
      <CsContainer>
        <ListTranslate>
          {Languages.map((item: any, index) => (
            <CsFlex key={item?.code}>
              <ButtonChooseLg
                onClick={() => {
                  setLanguage(item.code);
                  sessionStorage.setItem("language", item.code);
                  onDismiss();
                }}
              >
                {item.name}
              </ButtonChooseLg>
            </CsFlex>
          ))}
        </ListTranslate>
      </CsContainer>
    </CsModal>
  );
};

const CsModal = styled(Modal)``;

const CsContainer = styled(Flex)`
  background-color: red;
  height: 100%;
`;

const ListTranslate = styled(Flex)`
  position: absolute;
  background: white;
  display: block;
  max-height: 600px;
  width: 100%;
  overflow-y: scroll;
  bottom: 0px;
  left: 0px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const CsFlex = styled(Flex)`
  border-bottom: 1px solid whitesmoke;
`;

const ButtonChooseLg = styled(Button)`
  background-color: transparent;
  font-weight: 700;
  font-size: 16px;
  line-height: 150%;
  color: #0f172a;
`;

export default ModalLanguages;
