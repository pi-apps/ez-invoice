import { Button, Flex, Text, Skeleton, Image } from '@devfedeltalabs/pibridge_uikit';
import Header from 'components/Header';
import { NavLink, useNavigate } from 'react-router-dom';
import { Fragment, useMemo, useEffect, useState } from 'react';
import Container from 'components/Layout/Container';
import PageFullWidth from "components/Layout/PageFullWidth";
import Row from 'components/Layout/Row';
import Nav from 'react-bootstrap/Nav';
import { GetDataPreview } from 'state/preview';
import styled from 'styled-components';
import { UndefineIcon } from 'components/Svg';
import { createInvoice_text } from 'translation/languages/createInvoice_text';
import { previewInvoiceTranslate } from 'translation/translateArrayObjects';
import BigNumber from 'bignumber.js';
import { getUser } from 'state/user';
import { previewInvoice_text } from 'translation/languages/previewInvoice';
import { AppDispatch } from 'state';
import { useDispatch } from 'react-redux';
import { getDataImages } from 'state/preview/actions';
import { GetHistory } from 'state/history';
import { totalPrice } from 'utils/sumTotalItems';

const Preview = () => {
    const data = GetDataPreview()
    const navigate = useNavigate();
    const items = data?.dataPreview
    const images = data?.images
    const listItems = data?.dataPreview.items
    console.log('listItems', items)
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
    
    const subTotal = useMemo(() => {
        return totalPrice(listItems)
    },[listItems]);

    const dataHistory = GetHistory()
    const taxValue = Number(items?.tax)
    const shippingValue =  Number(items?.shipping)
    const discountValue =  Number(items?.discount)
    const amountPaidValue =  Number(items?.amountPaid)

    const activeTax = Number(items?.taxType)
    const activeDiscount = items?.discountType
    
    // Translate
    const userData = getUser();
    const languageUserApi = userData?.language
    const [stateText, setStateText] = useState(previewInvoice_text);
    const requestTrans = async () => {
        try {
        const resData = await previewInvoiceTranslate(languageUserApi);
        setStateText(resData)
        } catch (error) {
        console.log(error)
        }
    }
    useEffect(() => {
        if (languageUserApi) {
        requestTrans();
        } else if (!languageUserApi) {
        setStateText(previewInvoice_text);
        }
    }, [languageUserApi]);
    
    const dispatch = useDispatch<AppDispatch>()

    async function handleClick() {
        if( items?.invoiceId !== null || items?.invoiceId?.length) {
            navigate(`/updateinvoice/${items?.invoiceId}`)
        } else {
            navigate(`/newInvoice`)
        }
        
    }
    
    // Calculate the total amount due
    const [ taxAmount, setTaxAmount ] = useState("0")
    const [ disCountAmount, setDisCountAmout ] = useState("0")    
    // for tax amount
    
    useEffect(()=>{
      if(Number(activeTax) === 1){
        const taxAmount = new BigNumber(subTotal).multipliedBy(taxValue).dividedBy(100).toString()
        setTaxAmount(taxAmount)
      } else {
        setTaxAmount(taxValue.toString())
      }
    },[ subTotal, activeTax, taxValue ])
    // for tax discount
    useEffect(()=>{
      if(Number(activeDiscount) === 1){
        const disCountAmount = new BigNumber(subTotal).multipliedBy(discountValue).dividedBy(100).toString()
        setDisCountAmout(disCountAmount)
      } else {
        setDisCountAmout(discountValue.toString())
      }
    },[ subTotal, activeDiscount, discountValue ])

    // for total
    const total = useMemo(() => {
      return new BigNumber(subTotal).plus(taxAmount).minus(disCountAmount).plus(shippingValue).toString()
    },[subTotal, taxAmount, disCountAmount, shippingValue, activeDiscount, activeTax ]);

    const amountDue = useMemo(() => {
      return new BigNumber(total).minus(amountPaidValue).toString()
    },[total, amountPaidValue, activeDiscount, activeTax ]);

    const converTotal = new BigNumber(total).decimalPlaces(4,1)
    const convertAmountDue = new BigNumber(amountDue).decimalPlaces(4,1)

    const subTotalConvert = new BigNumber(subTotal).decimalPlaces(4,1)
    const convertShipping = new BigNumber(shippingValue).decimalPlaces(4,1)
    const convertAmountPaid = new BigNumber(amountPaidValue).decimalPlaces(4,1)
    // console.log("dataHistory?.isChangeImgHistory", dataHistory?.isChangeImgHistory)
    // console.log("items?.invoiceId", items?.invoiceId)
    return (
        <PageFullWidth>
            <CsContainer>
                <Header />
                    <CsWrapContainer>
                        <Flex width="100%" flexDirection="column" mb="30px">
                            <WContent>
                                <CsContentInfo>
                                    <Row>
                                        { ( ( items?.invoiceId == null || dataHistory?.isChangeImgHistory === true ) && images?.length > 0 ) &&
                                            <Image width={59} height={57} src={images[0]?.data_url} alt='logo' />
                                        }
                                        
                                        { ( items?.invoiceId && dataHistory?.isChangeImgHistory === false ) && 
                                            <Fragment>
                                                { items?.logoUrl &&
                                                    <Image width={59} height={57} src={items?.logoUrl} alt='logo' />
                                                }
                                            </Fragment>
                                        }
                                        { ( items?.invoiceId === null || items?.invoiceId !== undefined && dataHistory?.isChangeImgHistory === false && images?.length > 0 ) &&
                                            <Image width={59} height={57} src={images[0]?.data_url} alt='logo' />
                                        }
                                    </Row>
                                    <Row mt="30px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.text_invoiceNumber}</CsTextLeft>
                                        <Flex width="60%" justifyContent="flex-end">
                                            { items?.invoiceNumber &&
                                                <CsTextRight width="100%" textAlign="right" bold style={{wordBreak:"break-word"}}>{items?.invoiceNumber}</CsTextRight>
                                            }
                                        </Flex>
                                    </Row>
                                    <Row mt="30px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.text_bill_from}</CsTextLeft>
                                        <Flex width="60%" justifyContent="flex-end">
                                            { items?.billFrom &&
                                                <CsTextRight width="100%" textAlign="right" bold style={{wordBreak:"break-word"}}>{items?.billFrom}</CsTextRight>
                                            }
                                        </Flex>
                                       
                                    </Row>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.text_bill_to}</CsTextLeft>
                                        <Flex width="60%" justifyContent="flex-end">
                                            { items?.billTo &&
                                                <CsTextRight width="100%" textAlign="right" bold style={{wordBreak:"break-word"}}>{items?.billTo}</CsTextRight>
                                            }
                                        </Flex>
                                       
                                    </Row>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.text_date}</CsTextLeft>
                                        {convertDate(items?.issueDate)}
                                    </Row>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.text_due_date}</CsTextLeft>
                                        {convertDate(items?.dueDate)}
                                    </Row>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.text_payment_terms}</CsTextLeft>
                                        <Flex width="60%" justifyContent="flex-end">
                                            { items?.paymentTerms &&
                                                <CsTextRight bold width="100%" textAlign="right" style={{wordBreak:"break-word"}}>{items?.paymentTerms}</CsTextRight>
                                            }
                                        </Flex>
                                    </Row>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.text_po_number}</CsTextLeft>
                                        { items?.poNumber && 
                                            <CsTextRight bold>{items?.poNumber}</CsTextRight>
                                        }
                                    </Row>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.text_notes}</CsTextLeft>
                                        <Flex width="60%" justifyContent="flex-end">
                                            { items?.notes && 
                                                <CsTextRight width="100%" textAlign="right" bold style={{wordBreak:"break-word"}}>{items?.notes}</CsTextRight>
                                            }
                                        </Flex>
                                    </Row>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.text_terms}</CsTextLeft>
                                        <Flex width="60%" justifyContent="flex-end">
                                            { items?.terms && 
                                                <CsTextRight width="100%" textAlign="right" bold style={{wordBreak:"break-word"}}>{items?.terms}</CsTextRight>
                                            }
                                        </Flex>
                                    </Row>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.text_shipto}</CsTextLeft>
                                        <Flex width="60%" justifyContent="flex-end">
                                            { items?.terms && 
                                                <CsTextRight width="100%" textAlign="right" bold style={{wordBreak:"break-word"}}>{items?.shipTo}</CsTextRight>
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
                                    {listItems.map((item) => {
                                        const convertPrice = new BigNumber(item?.price).decimalPlaces(4,1)
                                        const convertTotal = new BigNumber((item?.quantity)*(item?.price)).decimalPlaces(4,1)
                                        return(
                                            <CsRow>
                                            <ColFirst paddingRight="15px" width="50%" style={{wordBreak:"break-word"}}>{item?.name}</ColFirst>   
                                            <Col width="10%">{item?.quantity}</Col>
                                            <Col width="20%">{Number(convertPrice.toString()).toLocaleString('en', { minimumFractionDigits: 4, maximumFractionDigits: 4,})} PI</Col>
                                            <Col width="20%">{Number(convertTotal.toString()).toLocaleString('en', { minimumFractionDigits: 4, maximumFractionDigits: 4,})} PI</Col>
                                        </CsRow>
                                        )
                                    })}
                                </CsContentBill>
                                <CsContentInfo>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.text_subtotal}</CsTextLeft>
                                        { subTotal &&
                                            <CsTextRight bold>{Number(subTotalConvert.toString()).toLocaleString('en', { minimumFractionDigits: 4, maximumFractionDigits: 4,})} PI</CsTextRight>
                                        }
                                    </Row>
                                    { ( Number(items?.tax) > 0 ) &&
                                         <Row mt="16px" style={{justifyContent: "space-between"}}>
                                            <CsTextLeft>{stateText.text_tax}{Number(items?.taxType ) === 1 && <>({items?.tax}%)</> }</CsTextLeft>
                                            <CsTextRight bold>{Number(items?.taxType) === 1 ? 
                                            <>
                                                {Number(taxAmount.toString()).toLocaleString('en', { minimumFractionDigits: 4, maximumFractionDigits: 4,})}
                                            </> 
                                            : 
                                            <>
                                                {Number(taxAmount.toString()).toLocaleString('en', { minimumFractionDigits: 4, maximumFractionDigits: 4,})}
                                            </> } PI</CsTextRight>
                                        </Row>
                                    }
                                    
                                    {( Number(items?.discount) > 0 ) &&
                                         <Row mt="16px" style={{justifyContent: "space-between"}}>
                                            <CsTextLeft>{stateText.text_discount}{items?.discountType === 1 && <>({items?.discount}%)</>}</CsTextLeft>
                                            <CsTextRight bold>{items?.discountType === 1 ? 
                                            <>
                                                {(Number(disCountAmount.toString())).toLocaleString('en', { minimumFractionDigits: 4, maximumFractionDigits: 4,})}
                                            </> : 
                                            <>
                                                {Number(disCountAmount.toString()).toLocaleString('en', { minimumFractionDigits: 4, maximumFractionDigits: 4,})}
                                            </>
                                            } PI</CsTextRight>
                                        </Row>
                                    }
                                    
                                    { ( Number(items?.shipping) > 0 ) &&
                                         <Row mt="16px" style={{justifyContent: "space-between"}}>
                                            <CsTextLeft>{stateText.text_shipping}</CsTextLeft>
                                            <CsTextRight bold>{Number(convertShipping.toString()).toLocaleString('en', { minimumFractionDigits: 4, maximumFractionDigits: 4,})} PI</CsTextRight>
                                        </Row>
                                    }
 
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.text_total}</CsTextLeft>
                                        { Number(subTotal) <= 0 ?
                                        <CsTextRight>
                                            {Number(0).toLocaleString('en', { minimumFractionDigits: 4, maximumFractionDigits: 4,})} PI
                                        </CsTextRight>
                                        :
                                        <CsTextRight bold>{Number(converTotal?.toString()).toLocaleString('en', { minimumFractionDigits: 4, maximumFractionDigits: 4,})} PI</CsTextRight>
                                        }
                                    </Row>

                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.text_amount_paid}</CsTextLeft>
                                        { !items?.amountPaid ?
                                            <CsTextRight>- {Number(0).toLocaleString('en', { minimumFractionDigits: 4, maximumFractionDigits: 4,})} PI</CsTextRight>
                                        :
                                            <CsTextRight bold>-{Number(convertAmountPaid.toString()).toLocaleString('en', { minimumFractionDigits: 4, maximumFractionDigits: 4,})} Pi</CsTextRight>
                                        }
                                    </Row>

                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.text_amount_due}</CsTextLeft>
                                        { Number(amountDue) < 0 ?
                                            <CsTextRight>{Number(0).toLocaleString('en', { minimumFractionDigits: 4, maximumFractionDigits: 4,})} PI</CsTextRight>
                                        :
                                            <CsTextRight bold>{ Number(convertAmountDue.toString()).toLocaleString('en', { minimumFractionDigits: 4, maximumFractionDigits: 4,})} PI</CsTextRight>
                                        }
                                    </Row>
                                </CsContentInfo>
                            </WContent>
                            <WAction>
                                <CsNavItem>
                                    <CsButton onClick={handleClick}>
                                        {stateText.text_back}
                                    </CsButton>
                                </CsNavItem>
                            </WAction>
                        </Flex>
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
export default Preview