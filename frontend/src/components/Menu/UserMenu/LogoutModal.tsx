import { Button, Flex, Modal, Text } from "@devfedeltalabs/pibridge_uikit";
import { LogoutIcon } from "components/Svg";
import { Translate } from "react-auto-translate";
import TranSlatorModal from "components/TranSlatorModal/TranSlatorModal";

interface LogoutProps {
  onDismiss?: () => void;
  onSubmit: () => void;
}

const LogoutModal: React.FC<LogoutProps> = ({ onDismiss, onSubmit }) => {
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
            <Translate>Are you sure want to log out?</Translate>
          </Text>
          <Flex mt="1rem" justifyContent="space-between">
            <Button width="48%" variant="secondary" onClick={onDismiss}>
              <Translate>Cancel</Translate>
            </Button>
            <Button width="48%" onClick={onSubmit}>
              <Translate>Confirm</Translate>
            </Button>
          </Flex>
        </Flex>
      </Modal>
    </TranSlatorModal>
  );
};
export default LogoutModal;
