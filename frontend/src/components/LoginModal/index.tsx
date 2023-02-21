import { Button, Flex, Modal, Text } from "@devfedeltalabs/pibridge_uikit";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Translate } from "react-auto-translate";
import { axiosClient } from "../../config/htttp";
import { AppDispatch } from "../../state";
import { accessToken, isLoading, setUser } from "../../state/user/actions";
import { AuthResult, PaymentDTO } from "../Menu/UserMenu/type";
import LoginIcon from "../Svg/Icons/LoginIcon";
import TranSlatorModal from "components/TranSlatorModal/TranSlatorModal";
import { fetchLoading } from "state/invoice/actions";
import useToast from "hooks/useToast";

interface Props {
  onDismiss?: () => void;
}

const LoginModal: React.FC<Props> = ({ onDismiss }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>(); 
  const { toastSuccess, toastError } = useToast()
  const signIn = async () => {
    try {
      const scopes = ["username", "payments"];
      dispatch(isLoading({isLoading:true}))
      const resultLogin = await  window.Pi.authenticate(scopes, onIncompletePaymentFound)
      if( resultLogin ) {
          const loginUser = await signInUser(resultLogin);
          if (loginUser?.data.message.accessToken.length) {
            dispatch(accessToken({accessToken:loginUser?.data?.message.accessToken}));
            const userInfor = await axiosClient.get("user/info", {
              headers: {
                'Authorization': `${loginUser?.data?.message.accessToken}`,
              }
            });
            
            if (userInfor) {
              dispatch(setUser(userInfor.data));
            }
            dispatch(isLoading({isLoading:false}))
          } else {
            dispatch(isLoading({isLoading:false}))
          }
          console.log(`Hi there! You're ready to make payments!`);
          dispatch(isLoading({isLoading:false}))
          toastSuccess(null, <Text style={{justifyContent: 'center'}}><Translate>Login successfully</Translate></Text>)
      } else {
        toastError('Error', <Text style={{justifyContent: 'center'}}><Translate>Somethig went wrong</Translate></Text>)
        dispatch(isLoading({isLoading:false}))
      }
    } catch (error) {
      dispatch(isLoading({isLoading:false}))
    }
  };

  const signInUser = async (authResult: AuthResult) => {
    return await axiosClient.post("/user/signin", { authResult });
  };
  const onIncompletePaymentFound = (payment: PaymentDTO) => {
    console.log("onIncompletePaymentFound", payment);
    return axiosClient.post("/payments/incomplete", { payment });
  };

  function declineClick() {
    onDismiss();
  }
  function accpetClick() {
    signIn();
    onDismiss();
  }
  return (
    <TranSlatorModal>
      <Modal
        title=""
        onDismiss={onDismiss}
        maxWidth="550px"
        modalIcon={<LoginIcon />}
      >
        <Flex flexDirection="column" width="100%">
          <Text bold fontSize="18px" width="100%" textAlign="center">
            <Translate>Please login first</Translate>
          </Text>
          <Text width="100%" textAlign="center" color="textSubtle" mt="10px">
            <Translate>You need to login to start using EzInvoice.</Translate>
          </Text>

          <Flex mt="1rem" justifyContent="space-between">
            <Button width="48%" variant="secondary" onClick={declineClick}>
              <Translate>Cancel</Translate>
            </Button>
            <Button width="48%" onClick={accpetClick}>
              <Translate>Login</Translate>
            </Button>
          </Flex>
        </Flex>
      </Modal>
    </TranSlatorModal>
  );
};
export default LoginModal;
