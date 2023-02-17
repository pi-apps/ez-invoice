import { AutoRenewIcon, Button, useModal } from "@devfedeltalabs/pibridge_uikit";
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
import { setUser } from "../../../state/user/actions";
import AccpetModal from "./AccpetModal";
import LogoutModal from "./LogoutModal";
import { AuthResult, PaymentDTO, User } from "./type";
import useToast from "hooks/useToast";
import { fetchLoading } from "state/invoice/actions";
import { GetAllInvoice, UseGetAllInvoice } from "state/invoice";

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
        if (loginUser) {
          const userInfor = await axiosClient.get("user/info");
          if (userInfor) {
            dispatch(setUser(userInfor.data));
          }
          dispatch(fetchLoading({isLoading:false}))
        }
        console.log(`Hi there! You're ready to make payments!`);
        toastSuccess('Login successfully')
      })
      .catch(function (error) {
        toastError('error', JSON.stringify(error))
        console.error(error);
        dispatch(fetchLoading({isLoading:false}))
      });
    // const authResult: AuthResult = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
  };
  
  const signOut = async () => {
    await dispatch(setUser(null));
    await signOutUser();
    await onDismis();
    toastSuccess('Logout successfully')
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
    <CsButton onClick={signIn} endIcon={isLoading ? <AutoRenewIcon spin color="textDisabled"/> :  <Translate>Login</Translate>} />
  ) : (
    <CsButton onClick={onPresentLogoutModal} endIcon={isLoading ? <AutoRenewIcon spin color="textDisabled"/> :  <Translate>Logout</Translate>} />
  );
};

export default UserMenu;

const CsButton = styled(Button)`
  min-width: 53px;
  height: 28px;
  background: #6b39f4;
  font-size: 12px;
  font-weight: 700;
  padding: 0px 4px;
`;
