import { Button, Flex, Text } from "@devfedeltalabs/pibridge_uikit";
import { Translate } from "react-auto-translate";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  
  return (
    <ContainerHeader>
      <Text fontSize="24px" bold>
        <Translate>Invoices</Translate>
      </Text>
      <NavLink to="/newInvoice">
        <Button>
          <Translate>New invoice</Translate>
        </Button>
      </NavLink>
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
