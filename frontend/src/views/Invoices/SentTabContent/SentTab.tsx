import { Flex, Text } from "@devfedeltalabs/pibridge_uikit";
import { Translate } from "react-auto-translate";
import { GetAnInvoice, UseGetAllInvoiceSentCore } from "state/invoice";
import { getAccessToken, getUser } from "state/user";
import styled from "styled-components";
import Card from "./Card";
import { MONTHS } from "../../../config/index";
import { useEffect, useState } from "react";
import { GetTranslateHolder } from "hooks/TranSlateHolder";
import { invoice_text } from "translation/languages/invoice_text";
import { invoiceTranslate } from "translation/translateArrayObjects";


const SentTab = () => {
  const [isOpen, setIsOpen] = useState(false);

  const userData = getUser();
  const languageUserApi = userData?.language
  
  const dataUser = getAccessToken()
  UseGetAllInvoiceSentCore(dataUser);
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

  // Translate
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
    <CsWrapContainer>
      {items?.listSent?.length && items?.isLoading === false ? (
        <>
          {items?.listSent.map((items) => {
            return (
              <CsContent>
                {convertDate(items?.date)}
                {items?.listItems.map((data, index) => {
                  return (
                    <Card
                      textPaid={stateText.text_paid}
                      textUnpaid={stateText.text_unpaid}
                      isOpen={isOpen}
                      onClick={() => setIsOpen(!isOpen)}
                      images={data?.logoUrl}
                      invoiceId={data?.invoiceId}
                      create={data?.createAt}
                      billTo={data?.billTo}
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
            {stateText.text_no_data}
          </Text>
        </Flex>
      )}
    </CsWrapContainer>
  );
};
const CsWrapContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  overflow: scroll;
  padding: 0 16px;
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
export default SentTab;
