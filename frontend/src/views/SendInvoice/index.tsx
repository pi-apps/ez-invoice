import React, { useEffect } from "react";
import PageFullWidth from "components/Layout/PageFullWidth";
import { Flex, Text } from "@phamphu19498/pibridge_uikit";
import styled from "styled-components";
import SubTab from "../CreateInvoices/components/SubTab";
import Container from "components/Layout/Container";
import Footer from "components/Footer";
import HeaderMain from "components/Header";
import FormSendInvoice from "./components/FormSendInvoice";
import SentInvoiceSuccessfully from "./components/SentInvoiceSuccessfully";

const SendInvoice = () => {
  return (
    <PageFullWidth>
      <CsContainer>
        <HeaderMain />
        <FormSendInvoice />
        {/* <SentInvoiceSuccessfully /> */}
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
