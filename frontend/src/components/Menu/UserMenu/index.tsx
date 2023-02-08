import {
  Button, useModal
} from '@phamphu19498/pibridge_uikit';
import { axiosClient } from 'config/htttp';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { AppDispatch } from '../../../state';
import { getUser } from '../../../state/user';
import { setUser } from '../../../state/user/actions';
import AccpetModal from './AccpetModal';
import LogoutModal from './LogoutModal';
import { AuthResult, PaymentDTO, User } from './type';

const UserMenu = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userData = getUser();
  const { t } = useTranslation();
  
  const signIn = async () => {
    const scopes = ['username', 'payments'];
    // const authResult: AuthResult = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
    const authResult: AuthResult = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
    const loginUser = await signInUser(authResult);
    // setUserData(authResult.user);
    if(loginUser){
      const userInfor = await axiosClient.get('user/info');
      if(userInfor){
        dispatch(setUser(userInfor.data));
      }
    }
  } 
  const signOut = () => {
    dispatch(setUser(null));
    signOutUser();
    onDismis();
  }
  const signInUser = async (authResult: AuthResult) => {
    return await axiosClient.post('/user/signin', {authResult});
  }
  const onIncompletePaymentFound = (payment: PaymentDTO) => {
    console.log("onIncompletePaymentFound", payment);
    return axiosClient.post('/payments/incomplete', {payment});
  }

  const signOutUser = () => {
      return axiosClient.post('/user/signout');
  }

  const [onPresentLogoutModal, onDismis] = useModal(<LogoutModal onSubmit={signOut} />);

  // if (user) {
  //   return (
  //     <CsButton onClick={onPresentLogoutModal}> Sign out </CsButton>
  //   )
  // }
  // check điều kiện
  // đã đăng ký gọi hàm login
  // chưa đăng ký gọi modal accpet để đăng ký
  return (
    userData ?
      <CsButton onClick={onPresentLogoutModal}>{t('logout')}</CsButton>
    :
      <CsButton onClick={signIn}>{t('login')}</CsButton>
  )
}

export default UserMenu

const CsButton = styled(Button)`
  width: 53px;
  height: 28px;
  background: #6B39F4;
  font-size: 12px;
  font-weight: 700;
  padding: 0px;
`