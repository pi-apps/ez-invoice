import { Box, Button, Flex, Input, ModalHeader, Text } from '@phamphu19498/pibridge_uikit'
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
  width: 100%;
  /* background-color:#F8F9FD; */
  border-radius:8px;
  /* margin-bottom:1rem; */
`
export const ContainerInputFile = styled(Flex)`
  flex-direction: column;
  width: 100%;
  background-color: transparent;
  border-radius:8px;
`

export const CsInputFile = styled(Input)`
  background: transparent;
  height: fit-content;
`
// export const CsInput = styled(Input)`
//   background: transparent;
//   border: none;
//   width: 100%;
// `
export const CsTextArea = styled.textarea`
  background: none;
  border: none;
  padding-left: 10px;
  border-radius: 0px;
  width: 327px;
  height: 91px;
  resize: unset;
  padding: 10px;
  width: 100%;
  box-shadow: none;
  font-size:14px;
  &::placeholder{
    color: #94A3B8;
    font-weight: 400;
    font-size: 12px;
  }
  :focus:not(:disabled){
    box-shadow:none!important;
  }
`

export const CsInput = styled(Input)`
  background: none;
  border: none;
  padding-left: 10px;
  border-radius: 0px;
  width: 100%;
  box-shadow: none;
  font-size:14px;
  height: 56px;
  &::placeholder{
    color: #94A3B8;
    font-weight: 400;
    font-size: 12px;
  }
  :focus:not(:disabled){
    box-shadow:none!important;
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
export const CsWrapperDateInput = styled.div`
  margin-top: 16px;

`
export const CsRow = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  gap: 10;
`
export const CsCol = styled.div`
  width: 50%;
`

export const WrapInput = styled(Flex)`
  position: relative;
  background-color:#F8F9FD;
  border-radius: 10px;
  width: 100%;
  /* height: 56px; */
  input{
    padding: 10px;
  }
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

  export const FormSubmit = styled.form`
    width: 100%;
  `

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