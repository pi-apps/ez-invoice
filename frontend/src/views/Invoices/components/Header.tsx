import { Button, Flex, Text } from "@devfedeltalabs/pibridge_uikit";
import { RefreshIcon } from "components/Svg";
import { GetTranslateHolder } from "hooks/TranSlateHolder";
import { useEffect, useState } from "react";
import { Translate } from "react-auto-translate";
import { NavLink, useNavigate } from "react-router-dom";
import { getUser } from "state/user";
import styled from "styled-components";

const Header = () => {
  const navigate = useNavigate();

  const userData = getUser();
  const languageUserApi = userData?.language
  const listText = {
    invoice: "Invoice",
    new_invoice: "New invoice",
  };
  const [stateText, setStateText] = useState(listText);
  const fcTransLateText = async (language) => {
    const resInvoice = await GetTranslateHolder(
        listText.invoice,
        language
      );
      const resNewInvoice = await GetTranslateHolder(
        listText.new_invoice,
        language
      );
      setStateText({
      invoice: resInvoice,
      new_invoice: resNewInvoice,
    });
  };

  useEffect(() => {
    if (!languageUserApi) {
      fcTransLateText('en')
    } else fcTransLateText(languageUserApi)
  }, [languageUserApi]);

  return (
    <ContainerHeader>
      <Text fontSize="24px" bold>
        {stateText.invoice}
      </Text>
      <Flex>
        <NavLink to="/newInvoice">
          <Button>
            {stateText.new_invoice}
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
