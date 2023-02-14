import { Button, useModal } from "@phamphu19498/pibridge_uikit";
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

const UserMenu = ({setLoading}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const userData = getUser();
  const { t } = useTranslation();

  const signIn = async () => {
    setLoading(true)
    const scopes = ["username", "payments"];
    window.Pi.authenticate(scopes, onIncompletePaymentFound)
      .then(async function (auth) {
        const loginUser = await signInUser(auth);
        if (loginUser) {
          const userInfor = await axiosClient.get("user/info");
          if (userInfor) {
            dispatch(setUser(userInfor.data));
          }
          setLoading(false)
        }
        console.log(`Hi there! You're ready to make payments!`);
      })
      .catch(function (error) {
        console.error(error);
        setLoading(false)
      });
    // const authResult: AuthResult = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
  };
  
  useEffect(() => {
    if (userData && !_.isEmpty(userData)) {
      const firstName = userData.firstName;
      if (!firstName) {
        navigate("/register");
      }
    }
  }, [userData]);

  const signOut = () => {
    dispatch(setUser(null));
    signOutUser();
    onDismis();
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
    <CsButton onClick={signIn}>
      <Translate>Login</Translate>
    </CsButton>
  ) : (
    <CsButton onClick={onPresentLogoutModal}>
      <Translate>logout</Translate>
    </CsButton>
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
