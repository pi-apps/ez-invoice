import { Flex, Text } from "@devfedeltalabs/pibridge_uikit";
import { MONTHS } from "config";
import { GetTranslateHolder } from "hooks/TranSlateHolder";
import { useEffect, useState } from "react";
import { Translate } from "react-auto-translate";
import { GetAnInvoice, UseGetAllInvoiceReceivedCore } from "state/invoice";
import { getAccessToken, getUser } from "state/user";
import styled from "styled-components";
import Card from "./Card";

const ReceiveTab = () => {
  
  const dataUser = getAccessToken()
  UseGetAllInvoiceReceivedCore(dataUser);
 
  const items = GetAnInvoice();

  function convertDate(date: any) {
    if (date) {
      const today = new Date(date);
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const yyyy = today.getFullYear();
      const selectedMonthName = MONTHS[Number(mm) - 1];
      return (
        <CsText>
          {dd} &nbsp;{selectedMonthName} &nbsp;{yyyy}
        </CsText>
      );
    }
    return null;
  }

  const userData = getUser();
  const languageUserApi = userData?.language
  const listText = {
    no_data: "No Data",
  };
  const [stateText, setStateText] = useState(listText);
  const fcTransLateText = async (language) => {
    const resNoData = await GetTranslateHolder(
        listText.no_data,
        language
      );
      setStateText({
      no_data: resNoData,
    });
  };

  useEffect(() => {
    if (!languageUserApi) {
      fcTransLateText('en')
    } else fcTransLateText(languageUserApi)
  }, [languageUserApi]);

  return (
    <CsWrapContainer>
      {items?.listReceived?.length && items?.isLoading === false ? (
        <>
          {items?.listReceived.map((items) => {
            return (
              <CsContent>
                {convertDate(items?.date)}
                {items?.listItems.map((data, index) => {
                  return (
                    <Card
                      images={data?.logoUrl}
                      invoiceId={data?.invoiceId}
                      create={data?.createAt}
                      billFrom={data?.billFrom}
                      amountDue={data?.amountDue.toString()}
                      paid={data?.paid}
                      invoiceNumber={data?.invoiceNumber}
                    />
                  );
                })}
              </CsContent>
            );
          })}
        </>
      ) : (
        <Flex width="100%" justifyContent="center" mt="2rem">
          <Text>
            {stateText.no_data}
          </Text>
        </Flex>
      )}
    </CsWrapContainer>
  );
};

const CsWrapContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 16px;
  overflow: scroll;
  height: calc(100vh - 300px);
`;
const CsContent = styled(Flex)`
  margin-top: 14px;
  flex-direction: column;
`;
const CsText = styled(Text)`
  font-weight: 500;
  font-size: 14px;
  color: #64748b;
`;

export default ReceiveTab;
