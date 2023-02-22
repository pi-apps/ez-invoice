import { Flex } from "@devfedeltalabs/pibridge_uikit";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { AppDispatch } from "state";
import { tabActive } from "state/invoice/actions";
import { Translate } from "react-auto-translate";
import { getUser } from "state/user";
import { useEffect, useState } from "react";
import { GetTranslateHolder } from "hooks/TranSlateHolder";
import { invoice_text } from "translation/languages/invoice/invoice_text";
import { invoiceTranslate } from "translation/translateArrayObjects";

interface PropsSubTab {
  isSent: boolean;
}

const SubTab: React.FC<PropsSubTab> = ({ isSent }) => {
  const dispatch = useDispatch<AppDispatch>();
  // Translate
  const userData = getUser();
  const languageUserApi = userData?.language
  const [stateText, setStateText] = useState(invoice_text);
  const requestTrans = async () => {
    try {
      const resData = await invoiceTranslate(languageUserApi);
      setStateText(resData)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (languageUserApi) {
      requestTrans();
    } else if (!languageUserApi) {
      setStateText(invoice_text);
    }
  }, [languageUserApi]);
  
  return (
    <ContainerSubTab>
      <TabButton
        isActive={isSent === !false}
        onClick={() => dispatch(tabActive({ isSent: true }))}
      >
        {stateText.text_sent}
      </TabButton>
      <TabButton
          isActive={isSent === false}
          onClick={() => dispatch(tabActive({ isSent: false }))}
        >
          {stateText.text_received}
      </TabButton>
    </ContainerSubTab>
  );
};
export default SubTab;

const ContainerSubTab = styled(Flex)`
  width: 100%;
  height: 48px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 12px;
  margin-top: 13px;
`;
const TabButton = styled(Flex)<{ isActive: boolean }>`
  width: 50%;
  height: 100%;
  font-weight: ${({ isActive }) => (isActive ? 700 : 400)};
  cursor: pointer;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid ${({ isActive }) => (isActive ? "#0F172A" : "none")};
  color: ${({ isActive, theme }) =>
    isActive ? "#0F172A" : theme.colors.textSubtle};
`;
