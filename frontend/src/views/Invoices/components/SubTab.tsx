import { Flex } from "@devfedeltalabs/pibridge_uikit";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { AppDispatch } from "state";
import { tabActive } from "state/invoice/actions";
import { Translate } from "react-auto-translate";
import { getUser } from "state/user";
import { useEffect, useState } from "react";
import { GetTranslateHolder } from "hooks/TranSlateHolder";

interface PropsSubTab {
  isSent: boolean;
}

const SubTab: React.FC<PropsSubTab> = ({ isSent }) => {
  const dispatch = useDispatch<AppDispatch>();
  const userData = getUser();
  const languageUserApi = userData?.language
  const listText = {
    sent: "Sent",
    received: "Received",
  };
  const [stateText, setStateText] = useState(listText);
  const fcTransLateText = async (language) => {
    const resInvoice = await GetTranslateHolder(
        listText.sent,
        language
      );
      const resNewInvoice = await GetTranslateHolder(
        listText.received,
        language
      );
      setStateText({
      sent: resInvoice,
      received: resNewInvoice,
    });
  };

  useEffect(() => {
    if (!languageUserApi) {
      fcTransLateText('en')
    } else fcTransLateText(languageUserApi)
  }, [languageUserApi]);
  
  return (
    <ContainerSubTab>
      <TabButton
        isActive={isSent === !false}
        onClick={() => dispatch(tabActive({ isSent: true }))}
      >
        {stateText.sent}
      </TabButton>
      <TabButton
          isActive={isSent === false}
          onClick={() => dispatch(tabActive({ isSent: false }))}
        >
          {stateText.received}
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
