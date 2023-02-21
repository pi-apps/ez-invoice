import { Button, Flex, Text } from "@devfedeltalabs/pibridge_uikit";
import { RefreshIcon } from "components/Svg";
import { useEffect, useState } from "react";
import { Translate } from "react-auto-translate";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  const navigate = useNavigate();

  const handleRefresh = () => {
    navigate("/");
    window.location.reload()
  }

  return (
    <ContainerHeader>
      <Text fontSize="24px" bold>
        <Translate>Invoices</Translate>
      </Text>
      <Flex>
        <Csrefresh role="presentation" onClick={handleRefresh}>
          <RefreshIcon />
        </Csrefresh>
        <NavLink to="/newInvoice">
          <Button>
            <Translate>New invoice</Translate>
          </Button>
        </NavLink>
      </Flex>
    </ContainerHeader>
  );
};
export default Header;

const Csrefresh = styled(Flex)`
  width: 44px;
  height: 44px;
  cursor: pointer;
  object-fit: contain;
  background: #F8F5FF;
  border-radius: 10px;
  margin-right: 12px;
  padding: 12px;
  &:hover{
    svg{
      transition: 0.5s;
      transform: rotate(45deg);
    }
  }
  &:active{
    margin-top: 1px;
  }
`

const ContainerHeader = styled(Flex)`
  width: 100%;
  height: 70px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 12px;
`;
