import React from "react";
import PageFullWidth from "components/Layout/PageFullWidth";
import Navbar from "react-bootstrap/Navbar";
import styled from "styled-components";
import Container from "components/Layout/Container";
import { Flex, Text, Button } from "@devfedeltalabs/pibridge_uikit";
import { Translate } from "react-auto-translate";
import { useDispatch } from "react-redux";
import { axiosClient } from "config/htttp";
import { GetAllInvoice } from "state/invoice";

const Header = () => {
  const dispatch = useDispatch()

  const handleClickNewInvoice = async () => {
    // dispatch(GetAllInvoice())
  }

  return (
    <ContainerHeader>
      <Text fontSize="24px" bold>
        <Translate>Invoices</Translate>
      </Text>
      <Navbar.Brand href="/newInvoice">
        <Button onClick={handleClickNewInvoice}>
          <Translate>New invoice</Translate>
        </Button>
      </Navbar.Brand>
    </ContainerHeader>
  );
};
export default Header;

const ContainerHeader = styled(Flex)`
  width: 100%;
  height: 70px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 12px;
`;
