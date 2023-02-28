import { Button, Flex, Image, Skeleton, Text } from '@devfedeltalabs/pibridge_uikit';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Container from 'components/Layout/Container';
import PageFullWidth from "components/Layout/PageFullWidth";
import Row from 'components/Layout/Row';
import { Translate } from "react-auto-translate";
import { Fragment } from 'react';
import { getAccessToken, getUser } from 'state/user';
import { useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import { GetTranslateHolder } from 'hooks/TranSlateHolder';
import Nav from 'react-bootstrap/Nav';
import { useNavigate, useParams } from 'react-router-dom';
import { GetAnInvoice, UseGetAnInvoiceCore } from 'state/invoice';
import styled from 'styled-components';
import { invoice_text } from 'translation/languages/invoice_text';
import { invoiceTranslate } from 'translation/translateArrayObjects';

const DetailSent = () => {
    const navigate = useNavigate();
    let { slug } = useParams()
    
    const dataUser = getAccessToken()
    
    UseGetAnInvoiceCore(slug, dataUser)
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
        
    const subTotal = new BigNumber(details?.subTotal).decimalPlaces(4,1)
    const convertPercentTax = new BigNumber(details?.subTotal*details?.tax/100).decimalPlaces(4,1)
    const convertTax = new BigNumber(details?.tax).decimalPlaces(4,1)
    const convertDiscount = new BigNumber(details?.discount).decimalPlaces(4,1)
    const convertDiscountPercent = new BigNumber(details?.discount*(details?.subTotal)/100).decimalPlaces(4,1)
    const convertShipping = new BigNumber(details?.shipping).decimalPlaces(4,1)
    const convertTotal = new BigNumber(details?.total).decimalPlaces(4,1)
    const convertAmountPaid = new BigNumber(details?.amountPaid).decimalPlaces(4,1)
    const convertAmountDue = new BigNumber(details?.amountDue).decimalPlaces(4,1)
    const convertTips = new BigNumber(details?.tip).decimalPlaces(4,1)
    const convertTotalAmountDueTips = new BigNumber(details?.amountDue).plus(details?.tip).decimalPlaces(4,1)

    return (
        <PageFullWidth>
            <CsContainer>
                <Header />
                    <CsWrapContainer>
                        <Flex width="100%" flexDirection="column" mb="30px">
                            <CsHeading>{stateText.text_invoice} #{details?.invoiceNumber}</CsHeading>
                            <WContent>
                                <CsContentInfo>
                                    <Row>
                                        { items?.isLoading ?
                                            <Skeleton width={60} />
                                        :
                                            <Fragment>
                                                { details?.logoUrl &&
                                                    <Image width={59} height={57} src={details?.logoUrl} alt='logo' />
                                                }
                                            </Fragment>
                                        }
                                    </Row>
                                    <Row mt="30px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.text_bill_from}</CsTextLeft>
                                        <Flex width="60%" justifyContent="flex-end">
                                            { items?.isLoading ?
                                                <Skeleton width={60} />
                                            :
                                                <CsTextRight width="100%" textAlign="right" bold style={{wordBreak:"break-word"}} >{details?.billFrom}</CsTextRight>
                                            }
                                        </Flex>
                                        
                                    </Row>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.text_bill_to}</CsTextLeft>
                                        <Flex width="60%" justifyContent="flex-end">
                                            { items?.isLoading ?
                                                <Skeleton width={60} />
                                            :
                                                <CsTextRight width="100%" textAlign="right" bold style={{wordBreak:"break-word"}} >{details?.billTo}</CsTextRight>
                                            }
                                        </Flex>
                                       
                                    </Row>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.text_issue_date}</CsTextLeft>
                                        {convertDate(details?.issueDate)}
                                    </Row>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.text_due_date}</CsTextLeft>
                                        {convertDate(details?.dueDate)}
                                    </Row>
                                    {/* <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.text_payment_terms}</CsTextLeft>
                                        { items?.isLoading ?
                                            <Skeleton width={60} />
                                        :
                                            <CsTextRight bold>{details?.paymentTerms}</CsTextRight>
                                        }
                                        
                                    </Row> */}
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.text_payment_terms}</CsTextLeft>
                                        <Flex width="60%" justifyContent="flex-end">
                                            { items?.isLoading ?
                                                <Skeleton width={60} />
                                            :
                                                <CsTextRight bold width="100%" textAlign="right" style={{wordBreak:"break-word"}}>{details?.paymentTerms}</CsTextRight>
                                            }
                                        </Flex>
                                    </Row>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.text_po_number}</CsTextLeft>
                                        { items?.isLoading ?
                                            <Skeleton width={60} />
                                        :
                                            <CsTextRight bold >{details?.poNumber}</CsTextRight>
                                        }
                                    </Row>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.text_notes}</CsTextLeft>

                                        <Flex width="60%" justifyContent="flex-end">
                                            { items?.isLoading ?
                                                <Skeleton width={60} />
                                            :
                                                <CsTextRight width="100%" textAlign="right" bold style={{wordBreak:"break-word"}} >{details?.notes}</CsTextRight>
                                            }
                                        </Flex>
                                    </Row>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.text_terms}</CsTextLeft>
                                        <Flex width="60%" justifyContent="flex-end">
                                            { items?.isLoading ?
                                                <Skeleton width={60} />
                                            :
                                                <CsTextRight width="100%" textAlign="right" bold style={{wordBreak:"break-word"}} >{details?.terms}</CsTextRight>
                                            }
                                        </Flex>
                                    </Row>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.text_shipto}</CsTextLeft>
                                        <Flex width="60%" justifyContent="flex-end">
                                            { items?.isLoading ?
                                                <Skeleton width={60} />
                                            :
                                                <CsTextRight width="100%" textAlign="right" bold style={{wordBreak:"break-word"}} >{details?.shipTo}</CsTextRight>
                                            }
                                        </Flex>
                                    </Row>
                                </CsContentInfo>
                                <CsContentBill>
                                    <CsRowth>
                                        <ColFirstth paddingRight="15px" width="50%">{stateText.text_item}</ColFirstth>
                                        <Colth width="10%">{stateText.text_quanlity}</Colth>
                                        <Colth width="20%">{stateText.text_unit_price}</Colth>
                                        <Colth width="20%">{stateText.text_total}</Colth>
                                    </CsRowth>
                                    {details?.items.map((item) => {
                                        const convertPrice = new BigNumber(item?.price).decimalPlaces(4,1)
                                        const convertTotal = new BigNumber(item?.quantity).multipliedBy(item?.price).decimalPlaces(4,1)
                                        return(
                                            <CsRow>
                                            <ColFirst paddingRight="15px" width="50%" style={{wordBreak:"break-word"}}><Translate>{item?.name}</Translate></ColFirst>
                                            <Col width="10%"><Translate>{item?.quantity}</Translate></Col>
                                            <Col width="20%">{Number(convertPrice.toString()).toLocaleString('en', { minimumFractionDigits: 4, maximumFractionDigits: 4,})} PI</Col>
                                            <Col width="20%">{Number(convertTotal.toString()).toLocaleString('en', { minimumFractionDigits: 4, maximumFractionDigits: 4,})} PI</Col>
                                        </CsRow>
                                        )
                                    })}

                                </CsContentBill>
                                 <CsContentInfo>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.text_subtotal}</CsTextLeft>
                                        { items?.isLoading ?
                                            <Skeleton width={60} />
                                        :
                                            <CsTextRight bold>{Number(subTotal.toString()).toLocaleString('en', { minimumFractionDigits: 4, maximumFractionDigits: 4,})} PI</CsTextRight>
                                        }
                                        
                                    </Row>

                                    { ( Number(details?.tax) > 0 && items?.isLoading === false ) &&
                                        <Row mt="16px" style={{justifyContent: "space-between"}}>
                                            <CsTextLeft>{stateText.text_tax}: 
                                                {details?.taxType === 1 && <>
                                                    ({Number(convertTax.toString()).toLocaleString('en', { minimumFractionDigits: 4, maximumFractionDigits: 4,})}%)
                                                </>
                                                }
                                            </CsTextLeft>
                                            <CsTextRight bold>{details?.taxType === 1 ? <>
                                                {(details?.subTotal && details?.tax) && Number(convertPercentTax.toString()).toLocaleString('en', { minimumFractionDigits: 4, maximumFractionDigits: 4,})}
                                            </> : <>
                                                {Number(convertTax.toString()).toLocaleString('en', { minimumFractionDigits: 4, maximumFractionDigits: 4,})}
                                            </> } PI</CsTextRight>
                                        </Row>
                                    }

                                    {( Number(details?.discount) > 0 && items?.isLoading === false ) &&
                                         <Row mt="16px" style={{justifyContent: "space-between"}}>
                                            <CsTextLeft>{stateText.text_discount}
                                            {details?.discountType === 1 && <>
                                                ({Number(convertDiscount.toString()).toLocaleString('en', { minimumFractionDigits: 4, maximumFractionDigits: 4,})}%)
                                            </>}</CsTextLeft>
                                            <CsTextRight bold>{details?.discountType === 1 ? 
                                            <>
                                                {Number(convertDiscountPercent.toString()).toLocaleString('en', { minimumFractionDigits: 4, maximumFractionDigits: 4,})}
                                            </> : 
                                            <>
                                                {Number(convertDiscount.toString()).toLocaleString('en', { minimumFractionDigits: 4, maximumFractionDigits: 4,})}
                                            </>
                                            } PI</CsTextRight>
                                        </Row>
                                    }
                                    
                                    { ( Number(details?.shipping) > 0 && items?.isLoading === false ) &&
                                         <Row mt="16px" style={{justifyContent: "space-between"}}>
                                            <CsTextLeft>{stateText.text_shipping}</CsTextLeft>
                                            <CsTextRight bold>{details?.shipping && Number(convertShipping.toString()).toLocaleString('en', { minimumFractionDigits: 4, maximumFractionDigits: 4,})} PI</CsTextRight>
                                        </Row>
                                    }
 
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.text_total}</CsTextLeft>
                                        { items?.isLoading ?
                                            <Skeleton width={60} />
                                        :
                                            <CsTextRight bold>{details?.total && Number(convertTotal.toString()).toLocaleString('en', { minimumFractionDigits: 4, maximumFractionDigits: 4,})} PI</CsTextRight>
                                        }
                                    </Row>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.text_amount_paid}</CsTextLeft>
                                        { items?.isLoading ?
                                            <Skeleton width={60} />
                                        :
                                            <CsTextRight bold>-{Number(convertAmountPaid.toString()).toLocaleString('en', { minimumFractionDigits: 4, maximumFractionDigits: 4,})} PI</CsTextRight>
                                        }
                                    </Row>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.text_amount_due}</CsTextLeft>
                                        { items?.isLoading ?
                                            <Skeleton width={60} />
                                        :
                                            <CsTextRight bold>{details?.amountDue &&  Number(convertAmountDue.toString()).toLocaleString('en', { minimumFractionDigits: 4, maximumFractionDigits: 4,})} PI</CsTextRight>
                                        }
                                    </Row>
                                </CsContentInfo>
                            </WContent>
                            <WAction>
                                <CsNavItem>
                                    <CsButton onClick={()=> navigate("/invoice")}>
                                        {stateText.text_back}
                                    </CsButton>
                                </CsNavItem>
                            </WAction>
                        </Flex>
                        <Footer/>
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
export default DetailSent