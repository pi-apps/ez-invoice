import { Button, Flex, Modal, Text } from "@devfedeltalabs/pibridge_uikit";
import { LogoutIcon } from "components/Svg";
import { Translate } from "react-auto-translate";
import TranSlatorModal from "components/TranSlatorModal/TranSlatorModal";
import { getUser } from "state/user";
import { useEffect, useState } from "react";
import { GetTranslateHolder } from "hooks/TranSlateHolder";
import { useMenu_text } from "translation/languages/useMenu_text";
import { useMenuTranslate } from "translation/translateArrayObjects";

interface LogoutProps {
  onDismiss?: () => void;
  onSubmit: () => void;
}

const LogoutModal: React.FC<LogoutProps> = ({ onDismiss, onSubmit }) => {
  const userData = getUser();
  const languageUserApi = userData?.language
 // Translate
 const [stateText, setStateText] = useState(useMenu_text);
 const requestTrans = async () => {
   try {
     const resData = await useMenuTranslate(languageUserApi);
     setStateText(resData)
   } catch (error) {
     console.log(error)
   }
 }
 useEffect(() => {
   if (languageUserApi) {
     requestTrans();
   } else if (!languageUserApi) {
     setStateText(useMenu_text);
   }
 }, [languageUserApi]);

  return (
    <TranSlatorModal>
      <Modal
        title=""
        onDismiss={onDismiss}
        maxWidth="550px"
        modalIcon={<LogoutIcon />}
      >
        <Flex flexDirection="column" width="100%">
          <Text bold fontSize="18px" width="100%" textAlign="center">
            {stateText.text_are_your_sure_logout}
          </Text>
          <Flex mt="1rem" justifyContent="space-between">
            <Button width="48%" variant="secondary" onClick={onDismiss}>
              {stateText.text_cancel}
            </Button>
            <Button width="48%" onClick={onSubmit}>
              {stateText.text_confirm}
            </Button>
          </Flex>
        </Flex>
      </Modal>
    </TranSlatorModal>
  );
};
export default LogoutModal;
