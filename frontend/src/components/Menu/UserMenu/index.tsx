import React, { useState } from 'react'
import {
  Button,
  Flex,
  LogoutIcon,
  useModal,
  UserMenu as UIKitUserMenu,
  UserMenuItem
} from '@phamphu19498/pibridge_uikit'
import styled from 'styled-components';
import { AuthResult, PaymentDTO, User } from './type';
import { axiosClient } from 'config/htttp';

const UserMenu = () => {
  const avatarSrc =  undefined
  
  const [user, setUser] = useState<User | null>(null);
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
      <Button onClick={signOut}> Sign out </Button>
    )
  }
  return (
    <Button onClick={signIn}>
      Sign in
    </Button>
  )
  // return (
  //   <UIKitUserMenu avatarSrc={avatarSrc}>
  //     <UserMenuItem>
  //       <CsFlex alignItems="center" justifyContent="space-between" width="100%">
  //           Disconnect
  //         <CsLogoutIcon/>
  //       </CsFlex>
  //     </UserMenuItem>
  //   </UIKitUserMenu>
  // )
}

export default UserMenu


const CsFlex = styled(Flex)`
   color: #494949;
`
const CsLogoutIcon =styled(LogoutIcon)`
  fill: #494949;
`