import { Button, Flex, Text } from "@devfedeltalabs/pibridge_uikit";
import { RefreshIcon } from "components/Svg";
import { useEffect, useState } from "react";
import { Translate } from "react-auto-translate";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  const [refresh, setRefresh ] = useState<number>()
  const handleRefresh = () => {
    useEffect(() => {
      setRefresh(Date.now())
    },[refresh])
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
`

const ContainerHeader = styled(Flex)`
  width: 100%;
  height: 70px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 12px;
`;
