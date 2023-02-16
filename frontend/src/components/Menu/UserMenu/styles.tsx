import { Box, Button, Flex, Input, ModalHeader, Text } from '@devfedeltalabs/pibridge_uikit'
import styled from 'styled-components'

export const ButtonSignIn = styled.button`
  background: #fcfcfd;
  border: 2px solid #e6e8ec;
  padding: 12px 16px;
  border-radius: 90px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 80px;
  height: 40px;
  align-items: center;
  cursor: pointer;
  &:hover {
    background: #dbdbdd;
    transition: all 0.3s ease;
    transform: scale(1.02);
  }
`

export const WrapLink = styled(Flex)`
  gap: 10px;
`

export const TransferModal = styled(Button)`
  background: none;
  box-shadow: none;
  color: #e75243;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  padding: 0px;
`
export const ContainerInput = styled(Flex)`
  flex-direction: column;
  gap: 10px;
  margin-bottom: 5px;
`

export const CsInput = styled(Input)`
  background: none;
  border: none;
  padding-left: 35px;
  border-radius: 0px;
  /* width: 450px; */
  width: 100%;
  box-shadow: none;
  font-size:14px;
  border-bottom: 1px solid #EEEEEE;
  &::placeholder {
    color: #777e90;
  }
  :focus:not(:disabled){
    box-shadow:none!important;
  }
  @media only screen and (max-width: 600px) {
    /* width: 310px; */
  }
`

export const CsInputVerifyForgot = styled(CsInput)`
   width: auto;
   border-bottom: 1px solid #ccc;
`

export const CsInputVerify = styled(Input)`
  background: none;
  border: none;
  padding-left: 35px;
  width: 50px;
  box-shadow: none;
  font-size:14px;
  border-bottom: 1px solid #ccc;
  &::placeholder {
    color: #777e90;
  }
  @media only screen and (max-width: 600px) {
    /* width: 310px; */
  }
`

export const WrapInput = styled.div`
  position: relative;
  /* margin-bottom: 1rem; */
  /* border-bottom: 1px solid #ccc; */
`

export const WrapInputVerifyForgot = styled(Flex)`
  display: flex;
  justify-content: center;
`

export const ButtonSubmit = styled(Button)`
  background: #ff592c;
  border-radius: 25px;
  box-shadow: none;
`

export const FormSubmit = styled.form``

export const ContainerIcon = styled.label`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`




export const WrapIcon = styled(Text)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
  cursor: pointer;
`

export const LoginBody = styled(Flex)`
  gap: 38px;
`

export const Container = styled(Flex)`
  gap: 20px;
`

export const CsFlex = styled(Flex)`
  gap: 10px;
  /* margin-bottom: 20px; */
`
export const CsModalHeader = styled(ModalHeader)`
  padding-top: 41px;
`
export const ContainerVerify = styled(Flex)`
  gap: 5px;
`

export const CsBox = styled(Box)`
  flex: 1;
` 