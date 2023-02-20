import { AutoRenewIcon, Button, Text, useModal } from "@devfedeltalabs/pibridge_uikit";
import { axiosClient } from "config/htttp";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Translate } from "react-auto-translate";
import { AppDispatch } from "../../../state";
import { getUser } from "../../../state/user";
import { getAccessToken, setUser } from "../../../state/user/actions";
import AccpetModal from "./AccpetModal";
import LogoutModal from "./LogoutModal";
import { AuthResult, PaymentDTO, User } from "./type";
import useToast from "hooks/useToast";
import { fetchLoading } from "state/invoice/actions";

const UserMenu = ({isLoading}) => {
  const { toastSuccess, toastError } = useToast()
  
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const userData = getUser();
  const { t } = useTranslation();

  const signIn = async () => {
    dispatch(fetchLoading({isLoading:true}))
    const scopes = ["username", "payments"];
    window.Pi.authenticate(scopes, onIncompletePaymentFound)
      .then(async function (auth) {
        const loginUser = await signInUser(auth);
        dispatch(getAccessToken({accessToken:loginUser?.data?.message.accessToken}));
        if (loginUser) {
          const userInfor = await axiosClient.get("user/info", {
            headers: {
              'Authorization': `${loginUser?.data?.message.accessToken}`,
            }
          });
          if (userInfor) {
            dispatch(setUser(userInfor.data));
          }
          dispatch(fetchLoading({isLoading:false}))
        }
        console.log(`Hi there! You're ready to make payments!`);
        toastSuccess(null, <Text style={{justifyContent: 'center'}}><Translate>Login successfully</Translate></Text>)
      })
      .catch(function (error) {
        toastError('error', <Text style={{justifyContent: 'center'}}><Translate>{JSON.stringify(error)}</Translate></Text>)
        console.error(error);
        dispatch(fetchLoading({isLoading:false}))
      });
    // const authResult: AuthResult = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
  };
  
  const signOut = async () => {
    await dispatch(setUser(null));
    await signOutUser();
    await onDismis();
    toastSuccess(null, <Text style={{justifyContent: 'center'}}><Translate>Logout successfully</Translate></Text>)
    navigate("/");
  };

  const signInUser = async (authResult: AuthResult) => {
    return await axiosClient.post("/user/signin", { authResult });
  };
  const onIncompletePaymentFound = (payment: PaymentDTO) => {
    console.log("onIncompletePaymentFound", payment);
    return axiosClient.post("/payments/incomplete", { payment });
  };

  const signOutUser = () => {
    return axiosClient.post("/user/signout");
  };

  const [onPresentLogoutModal, onDismis] = useModal(
    <LogoutModal onSubmit={signOut} />
  );

  return userData === null || userData === undefined ? (
    <CsButton onClick={signIn} endIcon={isLoading ? <AutoRenewIcon style={{margin: 0}} spin color="textDisabled"/> :  <Translate>Login</Translate>} />
  ) : (
    <CsButton onClick={onPresentLogoutModal} endIcon={isLoading ? <AutoRenewIcon style={{margin: 0}} spin color="textDisabled"/> :  <Translate>Logout</Translate>} />
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
