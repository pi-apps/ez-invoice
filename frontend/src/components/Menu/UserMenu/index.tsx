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
  const loading = getStatusLoading()
  
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
      disabled={loading}
      endIcon={loading ? <AutoRenewIcon style={{margin: 0}} spin color="textDisabled"/> :  <Translate>Login</Translate>} />
  ) : (
    <CsButton 
      onClick={onPresentLogoutModal} 
      endIcon={loading ? <AutoRenewIcon style={{margin: 0}} spin color="textDisabled"/> :  <Translate>Logout</Translate>} 
    />
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
