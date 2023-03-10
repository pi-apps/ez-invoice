import { AutoRenewIcon, Button, Flex, Input, Text } from "@devfedeltalabs/pibridge_uikit";
import styled from "styled-components";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { getUser } from "state/user";
import { getAccessToken } from "state/user";
import { useNavigate, useParams } from 'react-router-dom';
import { axiosClient } from "config/htttp";
import { useContext, useEffect, useState } from "react";
import { Translate } from "react-auto-translate";
import { GetTranslateHolder } from "hooks/TranSlateHolder";
import ErrorMessages from "components/ErrorMessages/ErrorMessage";
import { getInvoiceId } from "state/newInvoiceId";
import useToast from "hooks/useToast";
import { download_text } from "translation/languages/download_text";
import { downloadTranslate } from "translation/translateArrayObjects";

interface FormSendInvoiceTypes {
  setIsSentSuccessfully: (e) => void;
}

const FormSendInvoice: React.FC<
  React.PropsWithChildren<FormSendInvoiceTypes>
> = ({ setIsSentSuccessfully }) => {
  const [errorSentText, setErrorSentText] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const accessTokenUser = getAccessToken()
  const { toastSuccess, toastError } = useToast();

  let { slug } = useParams()

  const DataAb = getUser();
  const languageUserApi = DataAb?.language

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").max(100, 'Max length is 100 characters').email('Invalid email address'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { handleSubmit, formState, control, getValues } = useForm(formOptions);
  const { errors } = formState;

  const handleLogin = async (data) => {
    setIsLoading(true)
    const dataPost = {
      invoiceId: slug,
      email: data.email,
      language: languageUserApi ? languageUserApi : "en",
    };

    try {
      const response = await axiosClient.post("invoice/send", dataPost, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          'Authorization': accessTokenUser,
        },
      });
      if (response.status === 200) {
        setIsSentSuccessfully(true);
      } else {
        setIsSentSuccessfully(false);
      }
      setIsLoading(false)
    } catch (error: any) {
      setIsSentSuccessfully(false);
      // setErrorSentText("Invoice not found",);
      toastError(stateText.text_error, error?.response?.data?.message)
      setIsLoading(false)
    }
  };

   // Translate
   const [stateText, setStateText] = useState(download_text);
   const requestTrans = async () => {
     try {
       const resData = await downloadTranslate(languageUserApi);
       setStateText(resData)
     } catch (error) {
       console.log(error)
     }
   }
   useEffect(() => {
     if (languageUserApi) {
       requestTrans();
     } else if (!languageUserApi) {
       setStateText(download_text);
     }
   }, [languageUserApi]);
   const navigate = useNavigate();
    return (
      <CsContainer>
        <CsFlex>
          <HeaderContainer>
            <Flex>
              <TextHeader>
                {stateText.text_send_invoice}
              </TextHeader>
            </Flex>
            <Flex marginTop="8px">
              <TextBody>
                {stateText.text_send_invoice_recipient}
              </TextBody>
            </Flex>
          </HeaderContainer>
          <FormContainer onSubmit={handleSubmit(handleLogin)}>
            <Flex width="100%" marginBottom="20px" flexDirection="column">
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <CsInput
                    name="email"
                    // type='email'
                    value={getValues("email")}
                    // type="email"
                    placeholder={`${stateText.text_recipientEmail}`}
                    onChange={(e) => {
                      field.onChange(e);
                      setErrorSentText("");
                    }}
                  />
                )}
              />
              <ErrorMessages errors={errors} name="email" />
              {errorSentText ? (
                <ErrorMessagesSent><Translate>{errorSentText}</Translate></ErrorMessagesSent>
              ) : null} 
            </Flex>
            <Flex>
              <CsButton
                disabled={!slug || isLoading}
                type="submit" 
                value="Submit" 
                endIcon={isLoading ? <AutoRenewIcon style={{margin: 0}} spin color="#fff"/> : <CsText>{stateText.text_send}</CsText>}
              />
            </Flex>
            <Flex width="100%" mt="1rem">
              <CsButtonBack
                onClick={()=> navigate(`/createDetail/${slug}`)}
              >
                {stateText.text_back}
              </CsButtonBack>
            </Flex>
          </FormContainer>
        </CsFlex>
      </CsContainer>
    );
};

const CsContainer = styled(Flex)`
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 30px;
  @media only screen and (max-width: 600px) {
    padding: 0px 10px;
  }
`;

const CsFlex = styled(Flex)`
  height: calc(100vh - 250px);
  flex-direction: column;
  overflow: scroll;
  padding: 12px;
  width: 100%;
`;

const HeaderContainer = styled(Flex)`
  flex-direction: column;
  margin-bottom: 24px;
`;

const FormContainer = styled.form`
  flex-direction: column;
`;

const TextBody = styled(Text)`
  font-family: "Manrope";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 170%;
  display: flex;
  align-items: center;
  letter-spacing: 0.3px;
  color: #64748b;
`;

const TextHeader = styled(TextBody)`
  font-weight: 700;
  font-size: 24px;
  line-height: 150%;
  color: #0f172a;
`;

const CsInput = styled(Input)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 16px;
  gap: 8px;
  height: 56px;
  background: #f8f9fd;
  border-radius: 12px;
  margin-bottom: 10px;
`;

const CsButton = styled(Button)`
  font-family: "Manrope";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 165%;
  width: 100%;
  display: flex;
  align-items: center;
  letter-spacing: 0.4px;
  color: #ffffff;
`;

const ErrorMessagesSent = styled.div`
  color: #ff592c;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.1;
  font-family: "Marcellus", serif;
`;

const CsText = styled(Text)`
    font-family: "Manrope";
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 165%;
    width: 100%;
    display: flex;
    align-self: center;
    justify-content: center;
    letter-spacing: 0.4px;
    color: #ffffff;
`
const CsButtonBack = styled.div`
    font-family: "Manrope";
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 165%;
    width: 100%;
    display: flex;
    align-items: center;
    letter-spacing: 0.4px;
    color: #ffffff;
    background: #6B39F4;
    border-radius: 10px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

export default FormSendInvoice;
