import React from "react";
import { Button, Flex, Image, Text } from "@phamphu19498/pibridge_uikit";
import styled from "styled-components";
import Navbar from "react-bootstrap/Navbar";
import { useParams } from "react-router-dom";
import { Translate } from "react-auto-translate";

interface Props {
  images:string
  id:string
  create:string
  billTo:string
  amountDue:string
  paid:boolean
}

const Card: React.FC<Props> = ({ 
  images,
  id,
  create,
  billTo,
  amountDue,
  paid,
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
    <Navbar.Brand href={`/detailSent/${id}`}>
      <CsContainer>
        <CsRow>
          <CsCol>
            <CsButton>
              <Image
                width={16}
                height={16}
                src={images}
                alt="logo"
              />
            </CsButton>
          </CsCol>
          <Flex flexDirection="column">
            <CsText bold>
              <Translate>Invoice</Translate> #{id}
            </CsText>
            {convertDate(create)}
          </Flex>
          <CsCol>
            <CsText bold>{billTo}</CsText>
            <CsText>{amountDue} Pi</CsText>
          </CsCol>
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
    </Navbar.Brand>
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
  padding: 16px;
`;
const CsCol = styled(Flex)`
  flex-direction: column;
  align-items: center;
  /* width: 100%; */
  height: 100%;
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
  width: 50px;
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
