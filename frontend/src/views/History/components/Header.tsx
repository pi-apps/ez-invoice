import React from "react";
import PageFullWidth from "components/Layout/PageFullWidth";
import Navbar from "react-bootstrap/Navbar";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Container from "components/Layout/Container";
import { Flex, Text, Button } from "@devfedeltalabs/pibridge_uikit";
import { Translate } from "react-auto-translate";
import { useDispatch } from "react-redux";
import { axiosClient } from "config/htttp";
import { GetAllInvoice } from "state/invoice";

const Header = () => {
  const dispatch = useDispatch()

  return (
    <ContainerHeader>
      <Flex width="100%">
        <Text fontSize="24px" bold><Translate>History</Translate></Text>
      </Flex>
      <Flex width="100%" mt="8px">
        <Text color="#64748B" fontSize="14px" bold><Translate>Let’s get started with a free EzInvoice account.</Translate></Text>
      </Flex>
      <Flex justifyContent="space-between" width="100%" style={{gap: '10px'}}>
        <Flex width="50%">
          <CsExport marginTop="14px" width='100%'>
            <Translate>Export</Translate>
          </CsExport>
        </Flex>

        <Flex width="50%">
          <NavLink to="/newInvoice">
            <Button marginTop="14px" width='100%'>
              <Translate>New invoice</Translate>
            </Button>
          </NavLink>
        </Flex>
      </Flex>
    </ContainerHeader>
  );
};
export default Header;

const ContainerHeader = styled(Flex)`
  width: 100%;
  height: fit-content;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0px 12px;
`;

const CsExport = styled(Button)`
  background: #f8f5ff;
  color: #6b39f4;
`
