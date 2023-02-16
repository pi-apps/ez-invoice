import { Button, Flex, Input, Text } from "@devfedeltalabs/pibridge_uikit";
import styled from "styled-components";
import { Controller, useForm } from "react-hook-form";
import { Translate } from "react-auto-translate";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import ErrorMessages from "./ErrorMessage";
import { getUser } from "state/user";
import { axiosClient } from "config/htttp";
import { useState } from "react";
// import { axiosClient } from "config/htttp";

interface FormSendInvoiceTypes {
  setIsSentSuccessfully: (e) => void;
}

const FormSendInvoice: React.FC<
  React.PropsWithChildren<FormSendInvoiceTypes>
> = ({ setIsSentSuccessfully }) => {
  const [errorSentText, setErrorSentText] = useState("");

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { handleSubmit, formState, control, getValues } = useForm(formOptions);
  const { errors } = formState;

  const handleLogin = async (data) => {
    const dataPost = {
      invoiceId: "EZ_1676364850177",
      email: data.email,
      language: "vi",
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
    } catch (error) {
      setIsSentSuccessfully(false);
      setErrorSentText("Invoice not found");
    }
  };

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
              rules={{
                required: "Email is required",
              }}
              render={({ field }) => (
                <CsInput
                  name="email"
                  value={getValues("email")}
                  type="email"
                  placeholder="Recipient email"
                  onChange={(e) => {
                    field.onChange(e);
                    setErrorSentText("");
                  }}
                />
              )}
            />
            <ErrorMessages errors={errors} name="email" />
            {errorSentText ? (
              <ErrorMessagesSent>{errorSentText}</ErrorMessagesSent>
            ) : null}
          </Flex>
          <Flex>
            <CsButton type="submit" value="Submit">
              Send
            </CsButton>
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
