import React, { useEffect, useState } from "react";
import { Button, Flex, Image, Text } from "@devfedeltalabs/pibridge_uikit";
import styled from "styled-components";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

import { useParams } from "react-router-dom";
import { getUser } from "state/user";
import { GetTranslateHolder } from "hooks/TranSlateHolder";
import { UndefineIcon } from "components/Svg";
import { invoice_text } from "translation/languages/invoice_text";
import { invoiceTranslate } from "translation/translateArrayObjects";

interface Props {
  images:string
  invoiceId:string
  create:string
  billFrom:string
  amountDue:string
  paid:boolean
  invoiceNumber:string, 
  onClick: () => void;
  isOpen: boolean;
  textPaid: string;
  textUnpaid: string;
}

const Card: React.FC<Props> = ({ 
  images,
  invoiceId,
  create,
  billFrom,
  amountDue,
  paid,
  invoiceNumber,
  onClick,
  isOpen,
  textPaid,
  textUnpaid,
 }) => {

  function convertDate(date: any) {
    if (date) {
      const today = new Date(date)
      const dd = String(today.getDate()).padStart(2, '0')
      const mm = String(today.getMonth() + 1).padStart(2, '0')
      const yyyy = today.getFullYear()
      return (
        <CsText >{dd}/{mm}/{yyyy}</CsText>
      )
    }
    return null
  }

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
    <NavLink to={`/detailReceived/${invoiceId}`}>
      <CsContainer>
        <CsRow>
          <CsCol>
            <CsButton>
              { images ?
                <Image
                  width={16}
                  height={16}
                  src={images}
                  alt="logo"
                />
              :
                <UndefineIcon width="30px" height="30px"/>
              }
            </CsButton>
          </CsCol>
          <CsColInvoiceNumber>
            <CsText bold>
              #{invoiceNumber} 
            </CsText>
          </CsColInvoiceNumber>
          <CsColBill>
            <CsText style={{wordBreak: 'break-all'}} bold>{billFrom}</CsText>
            <CsText>{amountDue} PI</CsText>
          </CsColBill>
          <CsCol>
            { !paid  ? (
              <CsStaTusUnpaid>
                {textUnpaid}
              </CsStaTusUnpaid>
            ) : (
              <CsStaTusPaid>
                {textPaid}
              </CsStaTusPaid>
            )}
          </CsCol>
        </CsRow>
      </CsContainer>
    </NavLink>
  );
};
const CsContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  /* height: 74px; */
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  margin-top: 14px;
`;

const CsRow = styled(Flex)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 8px;
`;
const CsCol = styled(Flex)`
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 17.5%;
`;

const CsColInvoiceNumber = styled(Flex)`
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 30%;
`;

const CsColBill = styled(Flex)`
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 40%;
`;

const CsButton = styled(Button)`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  padding: 0;
  object-fit: contain;
  background: #f8f5ff;
`;
const CsText = styled(Text)`
  font-size: 12px;
`;
const CsStaTusUnpaid = styled(Flex)`
  /* width: 50px; */
  background: #fcf8e9;
  border-radius: 6px;
  color: #ffcb11;
  align-self: center;
  justify-content: center;
  display: flex;
  padding: 8px;
  font-size: 10px;
  font-weight: 600;
`;
const CsStaTusPaid = styled(Flex)`
  width: 50px;
  background: #e9fcef;
  border-radius: 6px;
  color: #1dce5c;
  align-self: center;
  justify-content: center;
  display: flex;
  padding: 8px;
  font-size: 10px;
  font-weight: 600;
`;

export default Card;
