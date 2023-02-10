import React from 'react'
import { Button, Flex, Image, Text } from '@phamphu19498/pibridge_uikit'
import Navbar from 'react-bootstrap/Navbar';
import styled from 'styled-components'

const Card = ({index}) => {
  const status = ['Unpaid', 'Paid']
  const randomElement = status[Math.floor(Math.random() * status.length)];
  const isUnpaid = randomElement

  return (
    <Navbar.Brand href={`/detailReceived/${index}`}>
      <CsContainer>
        <CsRow>
          <CsCol>
            <CsButton>
              <Image width={24} height={24} src='/images/imgPi/receivedIcon.png' alt='' />
            </CsButton>
          </CsCol>
          <CsCol>
            <CsText bold>Invoice #1</CsText >
            <CsText>01/12/23</CsText>
          </CsCol>
          <CsCol>
            <CsText bold>Hesman</CsText >
            <CsText>100.00 Pi</CsText>
          </CsCol>
          <CsCol>
              {isUnpaid === 'Unpaid' ? (
                <CsStaTusUnpaid>  Unpaid </CsStaTusUnpaid>
                ) : (
                <CsStaTusPaid>  Paid </CsStaTusPaid>
              )}
          </CsCol>
        </CsRow>
      </CsContainer>
    </Navbar.Brand>
  ) 
}
const CsContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  /* height: 74px; */
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  margin-top: 14px;
`

const CsRow = styled(Flex)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
`
const CsCol = styled(Flex)`
  flex-direction: column;
  align-items: center;
  /* width: 100%; */
  height: 100%;
`
const CsButton = styled(Button)`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  padding: 0;
  object-fit: contain;
  background: #F8F5FF;
`
const CsText = styled(Text)`
  font-size: 12px;
`
const CsStaTusUnpaid = styled(Flex)`
  width: 50px;
  background: #FCF8E9;
  border-radius: 6px;
  color: #FFCB11;
  align-self: center;
  justify-content: center;
  display: flex;
  padding: 8px;
  font-size: 10px;
  font-weight: 600;
`
const CsStaTusPaid = styled(Flex)`
  width: 50px;
  background: #E9FCEF;
  border-radius: 6px;
  color: #1DCE5C;
  align-self: center;
  justify-content: center;
  display: flex;
  padding: 8px;
  font-size: 10px;
  font-weight: 600;
`

export default Card