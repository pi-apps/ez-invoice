import React from 'react'
import { useParams } from 'react-router-dom'
import PageFullWidth from "components/Layout/PageFullWidth";
import Container from 'components/Layout/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styled from 'styled-components';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { Button, Flex, Image, Text } from '@phamphu19498/pibridge_uikit';
import Row from 'components/Layout/Row';

const DetailSent = () => {
    let { slug } = useParams()

    const data = [
        {
            name: 'createToken1',
            quantity: 1,
            unitPrice: 45000,
        },
        {
            name: 'Burn token',
            quantity: 2,
            unitPrice: 45000,
        },
        {
            name: 'createToken3',
            quantity: 3,
            unitPrice: 45000,
        }
    ]
    
  return (
    <PageFullWidth>
        <CsContainer>
            <Header />
                <CsWrapContainer>
                    <Flex width="100%" flexDirection="column" mb="30px">
                        <CsHeading>Invoice #{slug}</CsHeading>
                        <WContent>
                            <CsContentInfo>
                                <Row>
                                    <Image width={59} height={57} src='/images/imgPi/DeltaLab_logo.png' alt='' />
                                </Row>
                                <Row mt="30px" style={{justifyContent: "space-between"}}>
                                    <CsTextLeft>Bill From</CsTextLeft>
                                    <CsTextRight bold>Delta Labs</CsTextRight>
                                </Row>
                                <Row mt="16px" style={{justifyContent: "space-between"}}>
                                    <CsTextLeft>Bill To</CsTextLeft>
                                    <CsTextRight bold>PiBridge</CsTextRight>
                                </Row>
                                <Row mt="16px" style={{justifyContent: "space-between"}}>
                                    <CsTextLeft>Issue Date</CsTextLeft>
                                    <CsTextRight bold>01/12/2033</CsTextRight>
                                </Row>
                                <Row mt="16px" style={{justifyContent: "space-between"}}>
                                    <CsTextLeft>Due Date</CsTextLeft>
                                    <CsTextRight bold>02/12/2033</CsTextRight>
                                </Row>
                                <Row mt="16px" style={{justifyContent: "space-between"}}>
                                    <CsTextLeft>Payment Terms</CsTextLeft>
                                    <CsTextRight bold>Net 30</CsTextRight>
                                </Row>
                                <Row mt="16px" style={{justifyContent: "space-between"}}>
                                    <CsTextLeft>PO Number</CsTextLeft>
                                    <CsTextRight bold>DTLPI-02</CsTextRight>
                                </Row>
                            </CsContentInfo>
                            <CsContentBill>
                                <CsRowth>
                                    <ColFirstth width="20%">item</ColFirstth>
                                    <Colth width="20%">quantity</Colth>
                                    <Colth width="20%">unit price</Colth>
                                    <Colth width="20%">total</Colth>
                                </CsRowth>
                                {data?.map((item) => {
                                    return(
                                        <CsRow>
                                        <ColFirst width="20%">{item?.name}</ColFirst>
                                        <Col width="20%">{item?.quantity}</Col>
                                        <Col width="20%">{item?.unitPrice}Pi</Col>
                                        <Col width="20%">{(item?.quantity)*(item?.unitPrice)}</Col>
                                    </CsRow>
                                    )
                                })}

                            </CsContentBill>
                            <CsContentInfo>
                                <Row mt="16px" style={{justifyContent: "space-between"}}>
                                    <CsTextLeft>Subtotal</CsTextLeft>
                                    <CsTextRight bold>105.00 Pi</CsTextRight>
                                </Row>
                                <Row mt="16px" style={{justifyContent: "space-between"}}>
                                    <CsTextLeft>Allowances</CsTextLeft>
                                    <CsTextRight bold>-5.00 Pi</CsTextRight>
                                </Row>
                                <Row mt="16px" style={{justifyContent: "space-between"}}>
                                    <CsTextLeft>Total</CsTextLeft>
                                    <CsTextRight bold>100.00 Pi</CsTextRight>
                                </Row>
                                <Row mt="16px" style={{justifyContent: "space-between"}}>
                                    <CsTextLeft>Amount Due</CsTextLeft>
                                    <CsTextRight bold>100.00 Pi</CsTextRight>
                                </Row>
                            </CsContentInfo>
                        </WContent>
                        <WAction>
                                <CsNavItem>
                                    <Navbar.Brand href="/invoice">
                                        <CsButton style={{background: '#F8F5FF', color: "#6B39F4"}} >
                                            Back
                                        </CsButton>
                                    </Navbar.Brand>
                                </CsNavItem>

                                <CsNavItem>
                                    <Navbar.Brand href="/download">
                                        <CsButton >
                                            Download
                                        </CsButton>
                                    </Navbar.Brand>
                                </CsNavItem>
                        </WAction>
                    </Flex>
                </CsWrapContainer>
            <Footer />
        </CsContainer>
    </PageFullWidth>
  )
}

const CsNavItem = styled(Nav.Item)`
  @media only screen and (max-width: 369px) {
    width: 100%;
    margin-bottom: 14px;
    }
`
const WAction = styled(Flex)`
    width: 100%;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 20px;
    margin-top: 20px;
`

const CsContentInfo = styled.div``

const CsContentBill = styled.div`
    margin-top: 60px;
    padding-bottom: 10px;
    border-bottom: 1px solid #E2E8F0;
`

const ColFirstth = styled(Text)`
    font-size: 8px;
    color: #94A3B8;
    text-transform: uppercase;
    text-align: left;
`
const ColFirst = styled(Text)`
    font-size: 8px;
    color: #0F172A;
    text-align: left;
`

const Colth = styled(Text)`
    font-size: 8px;
    color: #94A3B8;
    text-transform: uppercase;
    text-align: right;
`
const Col = styled(Text)`
    font-size: 8px;
    color: #0F172A;
    text-align: right;
`
const CsRowth = styled(Row)`
    align-items: center;
    padding-bottom: 6px;
    justify-content: space-between;
    border-bottom: 1px solid #E2E8F0;
`
const CsRow = styled(Row)`
    justify-content: space-between;
    align-items: center;
    margin-top: 14px;
`
const CsHeading = styled(Text)`
  font-weight: 500;
  font-size: 14px;
  color: #0F172A;
  text-align: center;
  font-weight: 700;
  font-size: 12px;
  padding: 12px 0;
`
const CsTextLeft = styled(Text)`
  font-weight: 500;
  font-size: 12px;
  color: #94A3B8;
  font-size: 12px;
`
const CsTextRight = styled(Text)`
  font-weight: 500;
  font-size: 12px;
  color: #0F172A;
  font-size: 12px;
`

const CsWrapContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  overflow: scroll;
  height: calc(100vh - 82px - 51px);
`

const CsContainer = styled(Container)`
    width: 100%;
    @media only screen and (max-width: 600px) {
        padding: 0px 10px;
    }
`
const WContent = styled.div`
    max-width: 100%;
    background: #F8F9FD;
    border-radius: 12px;
    padding: 26px 14px;
    margin-left: 20px;
    margin-right: 20px;
`
const NavCustom = styled(Nav)`
`
const CsButton = styled(Button)<{isActive:boolean}>`
  width: 156px;
  height: 56px;
  color: #fff;
  @media only screen and (max-width: 370px) {
    width: 100%;
    max-width: 100%;
    }
`
export default DetailSent