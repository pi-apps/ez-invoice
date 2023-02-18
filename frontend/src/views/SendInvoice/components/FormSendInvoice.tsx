import { AutoRenewIcon, Button, Flex, Input, Text } from "@devfedeltalabs/pibridge_uikit";
import styled from "styled-components";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
// import ErrorMessages from "./ErrorMessage";
import { getUser } from "state/user";
import { axiosClient } from "config/htttp";
import { useEffect, useState } from "react";
import { Translate } from "react-auto-translate";
import { GetTranslateHolder } from "hooks/TranSlateHolder";
import ErrorMessages from "components/ErrorMessages/ErrorMessage";
// import { axiosClient } from "config/htttp";

interface FormSendInvoiceTypes {
  setIsSentSuccessfully: (e) => void;
}

const FormSendInvoice: React.FC<
  React.PropsWithChildren<FormSendInvoiceTypes>
> = ({ setIsSentSuccessfully }) => {
  const [errorSentText, setErrorSentText] = useState("");
  const DataAb = getUser();
  const [isLoading, setIsLoading] = useState(false)

  const invoiceIdStorage = localStorage.getItem('invoiceIdStorage')

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { handleSubmit, formState, control, getValues } = useForm(formOptions);
  const { errors } = formState;

  const handleLogin = async (data) => {
    setIsLoading(true)
    const dataPost = {
      invoiceId: invoiceIdStorage,
      email: data.email,
      language: DataAb?.language ? DataAb.language : "en",
    };

    try {
      const response = await axiosClient.post("invoice/send", dataPost, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      if (response.status === 200) {
        setIsSentSuccessfully(true);
      } else {
        setIsSentSuccessfully(false);
      }
      setIsLoading(false)
    } catch (error) {
      setIsSentSuccessfully(false);
      setErrorSentText("Invoice not found");
      setIsLoading(false)
    }
  };

  // translate placeholder
  const languageStorage  = localStorage.getItem('language');
  const [stateTextPlaceholder, setStateTextPlaceholder] = useState({
    recipientEmail: "Who is this invoice from? (required)",
  });

  const listTextPlaceHolder = {
    recipientEmail: "Who is this invoice from? (required)",
  };

  const changeTextPlaceHolderLg = async () => {
    const resRecipientEmail= await GetTranslateHolder(
        listTextPlaceHolder.recipientEmail,
        // language
        languageStorage
      );
    setStateTextPlaceholder({
      recipientEmail: resRecipientEmail,
    });
  };

  useEffect(() => {
    if (languageStorage === 'en')     
    return setStateTextPlaceholder({
        recipientEmail: "Who is this invoice from? (required)",
      });;
    changeTextPlaceHolderLg()
  }, [languageStorage]);

  return (
    <CsContainer>
      <CsFlex>
        <HeaderContainer>
          <Flex>
            <TextHeader>
              <Translate>Send Invoice</Translate>
            </TextHeader>
          </Flex>
          <Flex marginTop="8px">
            <TextBody>
              <Translate>Send invoice to recipient via email</Translate>
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
                  value={getValues("email")}
                  type="email"
                  placeholder={`${stateTextPlaceholder.recipientEmail}`}
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
              // disabled={!invoiceIdStorage}
              type="submit" 
              value="Submit" 
              endIcon={isLoading ? <AutoRenewIcon style={{margin: 0}} spin color="#fff"/> : <Translate>Send</Translate>}
            />
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

export default FormSendInvoice;
