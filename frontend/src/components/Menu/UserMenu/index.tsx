import { AutoRenewIcon, Button, Text, useModal } from "@devfedeltalabs/pibridge_uikit";
import { axiosClient } from "config/htttp";
import useToast from "hooks/useToast";
import { Translate } from "react-auto-translate";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AppDispatch } from "../../../state";
import { getAccessToken, getStatusLoading, getUser } from "../../../state/user";
import { accessToken, isLoading, setUser } from "../../../state/user/actions";
import LogoutModal from "./LogoutModal";
import { AuthResult, PaymentDTO } from "./type";

const UserMenu = () => {
  const { toastSuccess, toastError } = useToast()
  const accessTokenUser = getAccessToken()
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const userData = getUser();
  const { t } = useTranslation();

  const loading = getStatusLoading()
  
  const signIn = async () => {
    const scopes = ["username", "payments"];
    dispatch(isLoading({isLoading:true}))
    window.Pi.authenticate(scopes, onIncompletePaymentFound)
      .then(async function (auth) {
        
        const loginUser = await signInUser(auth);
        dispatch(accessToken({accessToken:loginUser?.data?.message.accessToken}));
        if (loginUser) {
          const userInfor = await axiosClient.get("user/info", {
            headers: {
              'Authorization': `${loginUser?.data?.message.accessToken}`,
            }
          });
          if (userInfor) {
            dispatch(setUser(userInfor.data));
          }
          dispatch(isLoading({isLoading:false}))
        }
        console.log(`Hi there! You're ready to make payments!`);
        toastSuccess(null, <Text style={{justifyContent: 'center'}}><Translate>Login successfully</Translate></Text>)
      })
      .catch(function (error) {
        toastError('error', <Text style={{justifyContent: 'center'}}><Translate>{JSON.stringify(error)}</Translate></Text>)
        console.error(error);
        dispatch(isLoading({isLoading:false}))
      });
    // const authResult: AuthResult = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
  };
  const signOut = async (token:string) => {
    if( token.length ) {
      await axiosClient.post("/user/signout", {}, {
        headers: {
          'Authorization': token,
        }
      });
      await dispatch(setUser(null));
      await dispatch(accessToken({accessToken:""}));
      await onDismis();
      toastSuccess(null, <Text style={{justifyContent: 'center'}}><Translate>Logout successfully</Translate></Text>)
      navigate("/");
    } else {
      toastError('Error')
    }
   
  };

  const signInUser = async (authResult: AuthResult) => {
    return await axiosClient.post("/user/signin", { authResult });
  };
  const onIncompletePaymentFound = (payment: PaymentDTO) => {
    console.log("onIncompletePaymentFound", payment);
    return axiosClient.post("/payments/incomplete", { payment });
  };

  const [onPresentLogoutModal, onDismis] = useModal(
    <LogoutModal onSubmit={() => signOut(accessTokenUser)} />
  );

  return userData === null || userData === undefined ? (
    <CsButton 
      onClick={signIn} 
      endIcon={loading ? <AutoRenewIcon style={{margin: 0}} spin color="textDisabled"/> :  <Translate>Login</Translate>} />
  ) : (
    <CsButton onClick={onPresentLogoutModal} endIcon={loading ? <AutoRenewIcon style={{margin: 0}} spin color="textDisabled"/> :  <Translate>Logout</Translate>} />
  );
};

export default UserMenu;

const CsButton = styled(Button)`
  min-width: 53px;
  height: 28px;
  background: #6b39f4;
  font-size: 12px;
  font-weight: 700;
  padding: 0px 8px;
`;
