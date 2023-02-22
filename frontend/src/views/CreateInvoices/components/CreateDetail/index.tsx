import { Button, Flex, Image, Skeleton, Text } from '@devfedeltalabs/pibridge_uikit';
import Header from 'components/Header';
import Container from 'components/Layout/Container';
import PageFullWidth from "components/Layout/PageFullWidth";
import BigNumber from 'bignumber.js';
import Row from 'components/Layout/Row';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useParams } from 'react-router-dom';
import { getAccessToken, getUser } from 'state/user';
import { GetAnInvoice, UseGetAnInvoiceCore } from 'state/invoice';
import styled from 'styled-components';
import Footer from '../Footer';
import { InvoiceIdContext } from 'contexts/InVoiceIdContext';
import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Translate } from "react-auto-translate";
import { GetTranslateHolder } from 'hooks/TranSlateHolder';

const CreateDetail = () => {

    let { slug } = useParams()
    const accessToken = getAccessToken()
    UseGetAnInvoiceCore(slug, accessToken)
    const { setInvoiceId } = useContext(InvoiceIdContext);
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
    useEffect(()=> {
        setInvoiceId(items?.details?.invoiceId)
    },[items?.details])

    // Trans language
    const userData = getUser();
    const languageUserApi = userData?.language
    const listText = {
      bill_from: "Bill From",
      bill_to: "Bill To",
      issue_date: "Issue Date",
      due_date: "Due Date",
      payment_terms: "Payment Terms",
      po_number: "PO Number",
      item: "Item",
      quanlity: "Quanlity",
      unit_price: "Unit Price",
      total: "Total",
      allowances: "Allowances",
      amount_due: "Amount Due",
      back: "Back",
      tax: "Tax",
      shipping: "Shipping",
      discount: "Discount",
      subtotal: "Subtotal",
      invoice: "Invoice",
    };
    const [stateText, setStateText] = useState(listText);
    const fcTransLateText = async (language) => {
        const resBillFrom = await GetTranslateHolder(
            listText.bill_from,
            language
        );
        const resBillTo = await GetTranslateHolder(
        listText.bill_to,
        language
        );
        const resIssueDate = await GetTranslateHolder(
        listText.issue_date,
        language
        );
        const resDueDate = await GetTranslateHolder(
        listText.due_date,
        language
        );
        const resPaymentTerms = await GetTranslateHolder(
        listText.payment_terms,
        language
        );
        const resPoNumber = await GetTranslateHolder(
        listText.po_number,
        language
        );
        const resItem = await GetTranslateHolder(
        listText.item,
        language
        );
        const resQuanlity = await GetTranslateHolder(
        listText.quanlity,
        language
        );
        const resUnitPrice = await GetTranslateHolder(
        listText.unit_price,
        language
        );
        const resTotal = await GetTranslateHolder(
        listText.total,
        language
        );
        const resAllowances = await GetTranslateHolder(
        listText.allowances,
        language
        );
        const resAmountDue = await GetTranslateHolder(
        listText.amount_due,
        language
        );
        const resBack = await GetTranslateHolder(
            listText.back,
            language
        );
        const resTax = await GetTranslateHolder(
            listText.tax,
            language
        );
        const resShipping = await GetTranslateHolder(
            listText.shipping,
            language
        );
        const resDiscount = await GetTranslateHolder(
            listText.discount,
            language
        );
        const resSubtotal = await GetTranslateHolder(
            listText.subtotal,
            language
        );
        const resInvoice = await GetTranslateHolder(
            listText.invoice,
            language
        );
        setStateText({
            allowances: resAllowances,
            amount_due: resAmountDue,
            bill_from: resBillFrom,
            bill_to: resBillTo,
            due_date: resDueDate,
            issue_date: resIssueDate,
            item: resItem,
            payment_terms: resPaymentTerms,
            po_number: resPoNumber,
            quanlity: resQuanlity,
            total: resTotal,
            unit_price: resUnitPrice,
            back: resBack,
            discount: resDiscount,
            shipping: resShipping,
            tax: resTax,
            invoice: resInvoice,
            subtotal: resSubtotal,
      });
    };
  
    useEffect(() => {
      if (!languageUserApi) {
        fcTransLateText('en')
      } else fcTransLateText(languageUserApi)
    }, [languageUserApi]);
   
    return (
        <PageFullWidth>
            <CsContainer>
                <Header />
                    <CsWrapContainer>
                        <Flex width="100%" flexDirection="column" mb="30px">
                            <CsHeading>Invoice #{details?.invoiceNumber}</CsHeading>
                            <WContent>
                                <CsContentInfo>
                                    <Row>
                                        { items?.isLoading ?
                                            <Skeleton width={60} />
                                        :
                                            <>
                                                { details?.logoUrl &&
                                                    <Image width={59} height={57} src={details?.logoUrl} alt='logo' />
                                                }
                                            </>
                                        }
                                    </Row>
                                    <Row mt="30px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.bill_from}</CsTextLeft>
                                        { items?.isLoading ?
                                            <Skeleton width={60} />
                                        :
                                            <CsTextRight bold>{details?.billFrom}</CsTextRight>
                                        }
                                    </Row>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.bill_to}</CsTextLeft>
                                        { items?.isLoading ?
                                            <Skeleton width={60} />
                                        :
                                            <CsTextRight bold>{details?.billTo}</CsTextRight>
                                        }
                                    </Row>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.issue_date}</CsTextLeft>
                                        {convertDate(details?.issueDate)}
                                    </Row>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.due_date}</CsTextLeft>
                                        {convertDate(details?.dueDate)}
                                    </Row>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.payment_terms}</CsTextLeft>
                                        { items?.isLoading ?
                                            <Skeleton width={60} />
                                        :
                                            <CsTextRight bold>{details?.paymentTerms}</CsTextRight>
                                        }
                                        
                                    </Row>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.po_number}</CsTextLeft>
                                        { items?.isLoading ?
                                            <Skeleton width={60} />
                                        :
                                            <CsTextRight bold>{details?.poNumber}</CsTextRight>
                                        }
                                        
                                    </Row>
                                </CsContentInfo>
                                <CsContentBill>
                                    <CsRowth>
                                        <ColFirstth width="20%">{stateText.item}</ColFirstth>
                                        <Colth width="20%">{stateText.quanlity}</Colth>
                                        <Colth width="20%">{stateText.unit_price}</Colth>
                                        <Colth width="20%">{stateText.total}</Colth>
                                    </CsRowth>
                                    {details?.items.map((item) => {
                                        return(
                                            <CsRow>
                                            <ColFirst width="20%">{item?.name}</ColFirst>
                                            <Col width="20%">{item?.quantity}</Col>
                                            <Col width="20%">{item?.price && item?.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2,})} Pi</Col>
                                            <Col width="20%">{((item?.quantity) &&(item?.price)) && ((item?.quantity)*(item?.price)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2,})} Pi</Col>
                                        </CsRow>
                                        )
                                    })}

                                </CsContentBill>
                                <CsContentInfo>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.subtotal}</CsTextLeft>
                                        { items?.isLoading ?
                                            <Skeleton width={60} />
                                        :
                                            <CsTextRight bold>{details?.subTotal && details?.subTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2,})} Pi</CsTextRight>
                                        }
                                    </Row>
                                    { ( Number(details?.tax) > 0 && items?.isLoading === false ) &&
                                         <Row mt="16px" style={{justifyContent: "space-between"}}>
                                            <CsTextLeft>{stateText.tax}({details?.tax} {details?.taxType === 1 ? "%" : "Pi"})</CsTextLeft>
                                            <CsTextRight bold>{details?.taxType === 1 ? <>
                                                {(details?.subTotal && details?.tax) && (details?.subTotal*details?.tax/100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2,})}
                                            </> : <>
                                                {details?.tax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2,})}
                                            </> } Pi</CsTextRight>
                                        </Row>
                                    }
                                    {( Number(details?.discount) > 0 && items?.isLoading === false ) &&
                                        <Row mt="16px" style={{justifyContent: "space-between"}}>
                                            <CsTextLeft>{stateText.discount}({details?.discount} {details?.discountType === 1 ? "%" : "Pi"})</CsTextLeft>
                                            <CsTextRight bold>{details?.discountType === 1 ? 
                                            <>
                                                {(details?.subTotal && details?.discount && details?.tax) && (details?.discount*(details?.subTotal + details?.tax)/100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2,})}
                                            </> : 
                                            <>
                                                {details?.discount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2,})}
                                            </>
                                            } Pi
                                            </CsTextRight>
                                        </Row>
                                    }
                                    
                                    { ( Number(details?.shipping) > 0 && items?.isLoading === false ) &&
                                         <Row mt="16px" style={{justifyContent: "space-between"}}>
                                            <CsTextLeft>{stateText.shipping}</CsTextLeft>
                                            <CsTextRight bold>{details?.shipping && details?.shipping.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2,})} Pi</CsTextRight>
                                        </Row>
                                    }
 
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.total}</CsTextLeft>
                                        { items?.isLoading ?
                                            <Skeleton width={60} />
                                        :
                                            <CsTextRight bold>{details?.total && details?.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2,})} Pi</CsTextRight>
                                        }
                                    </Row>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.allowances}</CsTextLeft>
                                        { items?.isLoading ?
                                            <Skeleton width={60} />
                                        :
                                            <CsTextRight bold>-{details?.amountPaid && details?.amountPaid.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2,})} Pi</CsTextRight>
                                        }
                                    </Row>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.amount_due}</CsTextLeft>
                                        { items?.isLoading ?
                                            <Skeleton width={60} />
                                        :
                                            <CsTextRight bold>{details?.amountDue && details?.amountDue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2,})} Pi</CsTextRight>
                                        }
                                    </Row>
                                </CsContentInfo>
                            </WContent>
                            <WAction>
                                    <CsNavItem>
                                        <NavLink to="/newInvoice">
                                            <CsButton>
                                                {stateText.back}
                                            </CsButton>
                                        </NavLink>
                                    </CsNavItem>
                            </WAction>
                        </Flex>
                        {/* <Footer isActive={3} invoiceId={details?.invoiceId} /> */}
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
    word-break: break-all;
`
const ColFirst = styled(Text)`
    font-size: 8px;
    color: #0F172A;
    text-align: left;
    word-break: break-all;
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
    word-break: break-all;
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
const CsTextRightTable = styled(Text)`
  font-weight: 500;
  font-size: 12px;
  color: #0F172A;
  font-size: 8px;
  text-align: right;
  word-break: break-all;
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