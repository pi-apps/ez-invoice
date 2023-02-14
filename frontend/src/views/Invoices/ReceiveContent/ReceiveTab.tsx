import { Flex, Text } from "@phamphu19498/pibridge_uikit";
import React from "react";
import styled from "styled-components";
import { Translate } from "react-auto-translate";
import Card from "./Card";
import { GetAnInvoice, UseGetAllInvoiceReceivedCore } from "state/invoice";

const ReceiveTab = () => {
  
  UseGetAllInvoiceReceivedCore()
  const items = GetAnInvoice()

  return (
    <CsWrapContainer>
      { ( items?.listReceived?.length && items?.isLoading === false ) ?
        <>
            {items?.listReceived.map((items) => {
              return (
                <CsContent>
                  <CsText>
                    <Translate>{items?.date}</Translate>
                  </CsText>
                  {items?.listItems.map((data, index) => {
                    return (
                      <Card
                        images={data?.logoUrl}
                        id={data?.invoiceId}
                        create={data?.createAt}
                        billTo={data?.billTo}
                        amountDue={data?.amountDue.toString()}
                        paid={data?.paid}
                      />
                    )
                    
                  })}
                </CsContent>
              );
            })}
        </>
      :
        <Flex width='100%' justifyContent="center" mt="2rem">
            <Text>No Data</Text>
        </Flex>
      }
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
