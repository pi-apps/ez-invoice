import { Button, Flex, Modal, Text } from "@devfedeltalabs/pibridge_uikit";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Translate } from "react-auto-translate";
import { axiosClient } from "../../config/htttp";
import { AppDispatch } from "../../state";
import { setUser } from "../../state/user/actions";
import { AuthResult, PaymentDTO } from "../Menu/UserMenu/type";
import TranSlatorModal from "components/TranSlatorModal/TranSlatorModal";
import { fetchLoading } from "state/invoice/actions";
import { RemoveIcon } from "components/Svg";

interface Props {
  onDismiss?: () => void;
}

const DeleteModal: React.FC<Props> = ({ onDismiss }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  // const signIn = async () => {
  //   dispatch(fetchLoading({ isLoading: true }));

  //   dispatch(fetchLoading({ isLoading: false }));

  // };

  function declineClick() {
    onDismiss();
  }
  function actionDelete() {
    onDismiss();
  }
  return (
    <TranSlatorModal>
      <Modal
        title=""
        onDismiss={onDismiss}
        maxWidth="550px"
        modalIcon={<RemoveIcon />}
      >
        <Flex marginTop='-10px' flexDirection="column" width="100%">
          <Text bold fontSize="18px" width="100%" textAlign="center">
            <Translate>Do you want to delete?</Translate>
          </Text>
          <Text width="100%" textAlign="center" color="textSubtle" mt="10px">
            <Translate>This action can not be undo</Translate>
          </Text>

          <Flex mt="1rem" justifyContent="space-between">
            <Button width="48%" variant="secondary" onClick={declineClick}>
              <Translate>Cancel</Translate>
            </Button>
            <Button width="48%" onClick={actionDelete}>
              <Translate>Delete</Translate>
            </Button>
          </Flex>
        </Flex>
      </Modal>
    </TranSlatorModal>
  );
};
export default DeleteModal;
