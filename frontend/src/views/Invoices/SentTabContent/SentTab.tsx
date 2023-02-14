import { Flex, Text } from "@phamphu19498/pibridge_uikit";
import { Translate } from "react-auto-translate";
import { GetAnInvoice, UseGetAllInvoiceSentCore } from "state/invoice";
import styled from "styled-components";
import Card from "./Card";

const SentTab = () => {

  UseGetAllInvoiceSentCore()
  const items = GetAnInvoice()
  
  return (
    <CsWrapContainer>
      { ( items?.listSent?.length && items?.isLoading === false ) ?
        <>
            {items?.listSent.map((items) => {
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
