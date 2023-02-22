import { Button, Flex, Modal, Text } from "@devfedeltalabs/pibridge_uikit";
import { LogoutIcon } from "components/Svg";
import { Translate } from "react-auto-translate";
import TranSlatorModal from "components/TranSlatorModal/TranSlatorModal";
import { getUser } from "state/user";
import { useEffect, useState } from "react";
import { GetTranslateHolder } from "hooks/TranSlateHolder";

interface LogoutProps {
  onDismiss?: () => void;
  onSubmit: () => void;
}

const LogoutModal: React.FC<LogoutProps> = ({ onDismiss, onSubmit }) => {
  const userData = getUser();
  const languageUserApi = userData?.language
  const listText = {
    are_your_sure_logout: "Are you sure want to log out?",
    cancel: "Cancel",
    confirm: "Confirm",
  };
  const [stateText, setStateText] = useState(listText);
  const fcTransLateText = async (language) => {
      const resAreYou = await GetTranslateHolder(
        listText.are_your_sure_logout,
        language
      );
      const resCancel = await GetTranslateHolder(
        listText.cancel,
        language
      );
      const resConfirm = await GetTranslateHolder(
        listText.confirm,
        language
      );
      setStateText({
        are_your_sure_logout: resAreYou,
        cancel: resCancel,
        confirm: resConfirm,
    });
  };

  useEffect(() => {
    if (!languageUserApi) {
      fcTransLateText('en')
    } else fcTransLateText(languageUserApi)
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
            {stateText.are_your_sure_logout}
          </Text>
          <Flex mt="1rem" justifyContent="space-between">
            <Button width="48%" variant="secondary" onClick={onDismiss}>
              {stateText.cancel}
            </Button>
            <Button width="48%" onClick={onSubmit}>
              {stateText.confirm}
            </Button>
          </Flex>
        </Flex>
      </Modal>
    </TranSlatorModal>
  );
};
export default LogoutModal;
