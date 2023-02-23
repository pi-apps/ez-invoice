import React, { useEffect, useState } from "react";
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
import { getUser } from "state/user";
import { history_text } from "translation/languages/history_text";
import { historyTranslate } from "translation/translateArrayObjects";

const Header = () => {
  const dispatch = useDispatch()
  // Translate
  const DataAb = getUser();
  const languageUserApi = DataAb?.language
  const [stateText, setStateText] = useState(history_text);
  const requestTrans = async () => {
      try {
      const resData = await historyTranslate(languageUserApi);
      setStateText(resData)
      } catch (error) {
      console.log(error)
      }
  }
  useEffect(() => {
      if (languageUserApi) {
      requestTrans();
      } else if (!languageUserApi) {
      setStateText(history_text);
      }
  }, [languageUserApi]);

  return (
    <ContainerHeader>
      <Flex width="100%">
        <Text fontSize="24px" bold>{stateText.text_history}</Text>
      </Flex>
      <Flex width="100%" mt="8px">
        <Text color="#64748B" fontSize="14px" bold>{stateText.text_let_ezinvoice_account}</Text>
      </Flex>
      <Flex justifyContent="flex-end" width="100%" style={{gap: '10px'}}>
        {/* <Flex width="50%">
          <CsExport marginTop="14px" width='100%'>
            {stateText.text_export}
          </CsExport>
        </Flex> */}

        <Flex width="50%">
          <NavLink style={{width: '100%'}} to="/newInvoice">
            <Button marginTop="14px" width='100%'>
              {stateText.text_new_invoice}
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
