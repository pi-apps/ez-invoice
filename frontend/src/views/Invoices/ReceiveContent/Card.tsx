import React from "react";
import { Button, Flex, Image, Text } from "@devfedeltalabs/pibridge_uikit";
import styled from "styled-components";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

import { useParams } from "react-router-dom";
import { Translate } from "react-auto-translate";
import { UndefineIcon } from "components/Svg";

interface Props {
  images:string
  invoiceId:string
  create:string
  billFrom:string
  amountDue:string
  paid:boolean
  invoiceNumber:number 
}

const Card: React.FC<Props> = ({ 
  images,
  invoiceId,
  create,
  billFrom,
  amountDue,
  paid,
  invoiceNumber
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
          <CsCol>
            <CsText bold>
              <Translate>#{invoiceNumber}</Translate> 
            </CsText>
          </CsCol>
          <CsColBill>
            <CsText bold>{billFrom}</CsText>
            <CsText>{amountDue} Pi</CsText>
          </CsColBill>
          <CsCol>
            { !paid  ? (
              <CsStaTusUnpaid>
                <Translate>Unpaid</Translate>
              </CsStaTusUnpaid>
            ) : (
              <CsStaTusPaid>
                <Translate>Paid</Translate>
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

const CsColBill = styled(Flex)`
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 47.5%;
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
