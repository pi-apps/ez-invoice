import {
  Button, useModal
} from '@phamphu19498/pibridge_uikit';
import { axiosClient } from 'config/htttp';
import { useState } from 'react';
import styled from 'styled-components';
import AccpetModal from './AccpetModal';
import LogoutModal from './LogoutModal';
import { AuthResult, PaymentDTO, User } from './type';

const UserMenu = () => {
  const [user, setUser] = useState<User | null>(null);
  const [onPresentAccpetModal] = useModal(<AccpetModal />)
  const [onPresentLogoutModal] = useModal(<LogoutModal />)
  
  const signIn = async () => {
    const scopes = ['username', 'payments'];
    const authResult: AuthResult = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
    signInUser(authResult);
    setUser(authResult.user);
  } 
  const signOut = () => {
    setUser(null);
    signOutUser();
  }
  const signInUser = (authResult: AuthResult) => {
    axiosClient.post('/user/signin', {authResult});
  }
  const onIncompletePaymentFound = (payment: PaymentDTO) => {
    console.log("onIncompletePaymentFound", payment);
    return axiosClient.post('/payments/incomplete', {payment});
  }

  const signOutUser = () => {
      return axiosClient.get('/user/signout');
  }
  if ( user ) {
    return (
      <CsButton onClick={onPresentLogoutModal}> Sign out </CsButton>
    )
  }
  // check điều kiện
  // đã đăng ký gọi hàm login
  // chưa đăng ký gọi modal accpet để đăng ký
  return (
    <CsButton onClick={onPresentAccpetModal}>
      Login
    </CsButton>
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