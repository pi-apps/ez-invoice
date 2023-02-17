import React, { useEffect, useState } from "react";
import PageFullWidth from "components/Layout/PageFullWidth";
import { Flex, Text } from "@devfedeltalabs/pibridge_uikit";
import styled from "styled-components";
import SubTab from "../CreateInvoices/components/SubTab";
import Container from "components/Layout/Container";
import Footer from "components/Footer";
import HeaderMain from "components/Header";
import FormSendInvoice from "./components/FormSendInvoice";
import SentInvoiceSuccessfully from "./components/SentInvoiceSuccessfully";
import { Translate } from "react-auto-translate";

const SendInvoice = () => {
  const [isSentSuccessfully, setIsSentSuccessfully] = useState(false);
  return (
    <PageFullWidth>
      <CsContainer>
        <HeaderMain />
        {isSentSuccessfully ? (
          <SentInvoiceSuccessfully
            setIsSentSuccessfully={setIsSentSuccessfully}
          />
        ) : (
          <FormSendInvoice setIsSentSuccessfully={setIsSentSuccessfully} />
        )}
        <Footer />
      </CsContainer>
    </PageFullWidth>
  );
};

const CsContainer = styled(Container)`
  width: 100%;
  @media only screen and (max-width: 600px) {
    padding: 0px 10px;
  }
`;

export default SendInvoice;
