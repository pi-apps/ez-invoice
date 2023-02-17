import { Button, Flex, Image, Skeleton, Text } from '@devfedeltalabs/pibridge_uikit';
import Header from 'components/Header';
import Container from 'components/Layout/Container';
import PageFullWidth from "components/Layout/PageFullWidth";
import Row from 'components/Layout/Row';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useParams } from 'react-router-dom';
import { GetAnInvoice, UseGetAnInvoiceCore } from 'state/invoice';
import styled from 'styled-components';
import Footer from '../Footer';
import { Translate } from "react-auto-translate";

const CreateDetail = () => {

    let { slug } = useParams()
    UseGetAnInvoiceCore(slug)
    const items = GetAnInvoice()
    const details = items?.details
    function convertDate(date: any) {
        if (date) {
          const today = new Date(date)
          const dd = String(today.getDate()).padStart(2, '0')
          const mm = String(today.getMonth() + 1).padStart(2, '0')
          const yyyy = today.getFullYear()
          return (
            <CsTextRight bold>{dd}/{mm}/{yyyy}</CsTextRight>
          )
        }
        return <Skeleton width={60} />
    }
    
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
                                        { items?.isLoading ?
                                            <Skeleton width={60} />
                                        :
                                            <Image width={59} height={57} src={details?.logoUrl} alt='logo' />
                                        }
                                    </Row>
                                    <Row mt="30px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft><Translate>Bill From</Translate></CsTextLeft>
                                        { items?.isLoading ?
                                            <Skeleton width={60} />
                                        :
                                            <CsTextRight bold>{details?.billFrom}</CsTextRight>
                                        }
                                    </Row>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>Bill To</CsTextLeft>
                                        { items?.isLoading ?
                                            <Skeleton width={60} />
                                        :
                                            <CsTextRight bold>{details?.billTo}</CsTextRight>
                                        }
                                    </Row>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft><Translate>Issue Date</Translate></CsTextLeft>
                                        {convertDate(details?.issueDate)}
                                    </Row>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft><Translate>Due Date</Translate></CsTextLeft>
                                        {convertDate(details?.dueDate)}
                                    </Row>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft><Translate>Payment Terms</Translate></CsTextLeft>
                                        { items?.isLoading ?
                                            <Skeleton width={60} />
                                        :
                                            <CsTextRight bold>{details?.paymentTerms}</CsTextRight>
                                        }
                                        
                                    </Row>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft><Translate>PO Number</Translate></CsTextLeft>
                                        { items?.isLoading ?
                                            <Skeleton width={60} />
                                        :
                                            <CsTextRight bold>{details?.poNumber}</CsTextRight>
                                        }
                                        
                                    </Row>
                                </CsContentInfo>
                                <CsContentBill>
                                    <CsRowth>
                                        <ColFirstth width="20%"><Translate>item</Translate></ColFirstth>
                                        <Colth width="20%"><Translate>quantity</Translate></Colth>
                                        <Colth width="20%"><Translate>unit price</Translate></Colth>
                                        <Colth width="20%"><Translate>total</Translate></Colth>
                                    </CsRowth>
                                    {details?.items.map((item) => {
                                        return(
                                            <CsRow>
                                            <ColFirst width="20%">{item?.name}</ColFirst>
                                            <Col width="20%">{item?.quantity}</Col>
                                            <Col width="20%">{item?.price}Pi</Col>
                                            <Col width="20%">{(item?.quantity)*(item?.price)}</Col>
                                        </CsRow>
                                        )
                                    })}

                                </CsContentBill>
                                <CsContentInfo>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft><Translate>Subtotal</Translate></CsTextLeft>
                                        { items?.isLoading ?
                                            <Skeleton width={60} />
                                        :
                                            <CsTextRight bold>{details?.subTotal} Pi</CsTextRight>
                                        }
                                        
                                    </Row>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft><Translate>Allowances</Translate></CsTextLeft>
                                        { items?.isLoading ?
                                            <Skeleton width={60} />
                                        :
                                            <CsTextRight bold>-{details?.amountPaid} Pi</CsTextRight>
                                        }
                                        
                                    </Row>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft><Translate>Total</Translate></CsTextLeft>
                                        { items?.isLoading ?
                                            <Skeleton width={60} />
                                        :
                                            <CsTextRight bold>{details?.total} Pi</CsTextRight>
                                        }
                                    </Row>
                                    { ( Number(details?.tax) > 0 && items?.isLoading === false ) &&
                                         <Row mt="16px" style={{justifyContent: "space-between"}}>
                                            <CsTextLeft><Translate>Tax:</Translate> ({details?.tax} {details?.taxType === 1 ? "%" : "Pi"})</CsTextLeft>
                                            <CsTextRight bold>{details?.taxType === 1 ? details?.subTotal*details?.tax/100 : details?.subTotal-details?.tax} {details?.taxType === 1 ? "%" : "Pi"}</CsTextRight>
                                        </Row>
                                    }
                                    { ( Number(details?.shipping) > 0 && items?.isLoading === false ) &&
                                         <Row mt="16px" style={{justifyContent: "space-between"}}>
                                            <CsTextLeft><Translate>Shipping</Translate></CsTextLeft>
                                            <CsTextRight bold>{details?.shipping} Pi</CsTextRight>
                                        </Row>
                                    }
                                    { ( Number(details?.discount) > 0 && items?.isLoading === false ) &&
                                         <Row mt="16px" style={{justifyContent: "space-between"}}>
                                            <CsTextLeft><Translate>Discount:</Translate> ({details?.discount} {details?.discountType === 1 ? "%" : "Pi"})</CsTextLeft>
                                            <CsTextRight bold>{details?.taxType === 1 ? details?.subTotal*details?.discount/100 : details?.subTotal-details?.tax} {details?.discountType === 1 ? "%" : "Pi"}</CsTextRight>
                                        </Row>
                                    }
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft><Translate>Amount Due</Translate></CsTextLeft>
                                        { items?.isLoading ?
                                            <Skeleton width={60} />
                                        :
                                            <CsTextRight bold>{details?.amountDue} Pi</CsTextRight>
                                        }
                                    </Row>
                                </CsContentInfo>
                            </WContent>
                            <WAction>
                                    <CsNavItem>
                                        <Navbar.Brand href="/newInvoice">
                                            <CsButton>
                                                <Translate>Back</Translate>
                                            </CsButton>
                                        </Navbar.Brand>
                                    </CsNavItem>
                            </WAction>
                        </Flex>
                        <Footer isActive="" />
                    </CsWrapContainer>
            </CsContainer>
        </PageFullWidth>
    )
}

const CsNavItem = styled(Nav.Item)`
    width: 100%;
    margin-bottom: 14px;
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
  width: 100%;
  height: 56px;
  color: #fff;
  @media only screen and (max-width: 370px) {
    width: 100%;
    max-width: 100%;
    }
`
export default CreateDetail