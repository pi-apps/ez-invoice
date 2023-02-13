import React from "react";
import { Button, Flex, Image, Text } from "@phamphu19498/pibridge_uikit";
import styled from "styled-components";
import Navbar from "react-bootstrap/Navbar";
import { useParams } from "react-router-dom";
import { Translate } from "react-auto-translate";

const Card = ({ index }) => {
  let { slug } = useParams();
  const status = ["Unpaid", "Paid"];
  const randomElement = status[Math.floor(Math.random() * status.length)];
  const isUnpaid = randomElement;

  return (
    <Navbar.Brand href={`/detailSent/${index}`}>
      <CsContainer>
        <CsRow>
          <CsCol>
            <CsButton>
              <Image
                width={16}
                height={16}
                src="/images/imgPi/sentIcon.png"
                alt=""
              />
            </CsButton>
          </CsCol>
          <CsCol>
            <CsText bold>
              <Translate>Invoice</Translate> #1
            </CsText>
            <CsText>01/12/23</CsText>
          </CsCol>
          <CsCol>
            <CsText bold>Hesman</CsText>
            <CsText>100.00 Pi</CsText>
          </CsCol>
          <CsCol>
            {isUnpaid === "Unpaid" ? (
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
