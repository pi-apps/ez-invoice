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
import { getUser } from 'state/user';
import { previewInvoice_text } from 'translation/languages/previewInvoice';

const Preview = () => {
    const data = GetDataPreview()
    const navigate = useNavigate();
    const items = data?.dataPreview
    const images = data?.images
    const listItems = data?.dataPreview.items
    
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

    const totalPrice = (fields) => {
        return fields.reduce((sum, i) => {
          if(i.price === undefined || i.quantity === undefined){
            return 0
          } else{
            return sum + i.price * i.quantity
          }
        },0)
      }
    
    const subTotal = useMemo(() => {
        return totalPrice(listItems)
    },[listItems]);


    const taxValue = Number(items?.tax)
    const shippingValue =  Number(items?.shipping)
    const discountValue =  Number(items?.discount)
    const amountPaidValue =  Number(items?.amountPaid)

    const activeTax = Number(items?.taxType)
    const activeDiscount = items?.discountType
    
    const taxValuePercent = taxValue * subTotal / 100 
    const isTaxValue = (activeTax === 1 ) ? taxValuePercent : taxValue
    const discountValuePercent = discountValue * (subTotal + isTaxValue) / 100 
    
    const isDiscountValuePercent = discountValue <= 100 ? discountValuePercent : subTotal // neu chon % discount.
    const isDiscount = (discountValue < subTotal) ? discountValue : subTotal

    const totalFinal = (total) => {
        if( activeTax === 2 && activeDiscount === 2){
          return total + taxValue + shippingValue - isDiscount
        } else if(activeTax === 2 && activeDiscount === 1){
          return total + taxValue - isDiscountValuePercent + shippingValue
        } else if(activeTax === 1 && activeDiscount === 1){
          return total + taxValuePercent + shippingValue - isDiscountValuePercent
        } else if(activeTax === 1 && activeDiscount === 2){
          return total + taxValuePercent + shippingValue - isDiscount
        }
    } 
    
    const totalFinaly = useMemo(() => {
        return totalFinal(subTotal)
      },[activeTax]);
      
    const balanceDue = amountPaidValue < totalFinaly ? totalFinaly - amountPaidValue : 0

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

    return (
        <PageFullWidth>
            <CsContainer>
                <Header />
                    <CsWrapContainer>
                        <Flex width="100%" flexDirection="column" mb="30px">
                            {/* <CsHeading>{stateText.invoide} #{details?.invoiceNumber}</CsHeading> */}
                            <WContent>
                                <CsContentInfo>
                                    <Row>
                                        { !images ?
                                            <UndefineIcon width="30px" height="30px"/>
                                        :
                                            <Image width={59} height={57} src={images[0]?.data_url} alt='logo' />
                                        }
                                    </Row>
                                    <Row mt="30px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.text_bill_from}</CsTextLeft>
                                        { items?.billFrom &&
                                            <CsTextRight bold>{items?.billFrom}</CsTextRight>
                                        }
                                    </Row>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.text_bill_to}</CsTextLeft>
                                        { items?.billTo &&
                                            <CsTextRight bold>{items?.billTo}</CsTextRight>
                                        }
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
                                        { items?.paymentTerms &&
                                            <CsTextRight bold>{items?.paymentTerms}</CsTextRight>
                                        }
                                        
                                    </Row>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.text_po_number}</CsTextLeft>
                                        { items?.poNumber && 
                                            <CsTextRight bold>{items?.poNumber}</CsTextRight>
                                        }
                                    </Row>
                                </CsContentInfo>
                                <CsContentBill>
                                    <CsRowth>
                                        <ColFirstth width="20%">{stateText.text_item}</ColFirstth>
                                        <Colth width="20%">{stateText.text_quanlity}</Colth>
                                        <Colth width="20%">{stateText.text_unit_price}</Colth>
                                        <Colth width="20%">{stateText.text_total}</Colth>
                                    </CsRowth>
                                    {listItems.map((item) => {
                                        return(
                                            <CsRow>
                                            <ColFirst width="20%">{item?.name}</ColFirst>   
                                            <Col width="20%">{item?.quantity}</Col>
                                            <Col width="20%">{item?.price && (item?.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2,})} Pi</Col>
                                            <Col width="20%">{((item?.quantity) &&(item?.price)) && ((item?.quantity)*(item?.price)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2,})} Pi</Col>
                                        </CsRow>
                                        )
                                    })}

                                </CsContentBill>
                                <CsContentInfo>
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.text_subtotal}</CsTextLeft>
                                        { subTotal &&
                                            <CsTextRight bold>{subTotal && subTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2,})} Pi</CsTextRight>
                                        }
                                        
                                    </Row>
                                    { ( Number(items?.tax) > 0 ) &&
                                         <Row mt="16px" style={{justifyContent: "space-between"}}>
                                            <CsTextLeft>{stateText.text_tax}: ({items?.tax} {Number( items?.taxType ) === 1 ? "%" : "Pi"})</CsTextLeft>
                                            <CsTextRight bold>{Number(items?.taxType) === 1 ? 
                                            <>
                                                {(subTotal && items?.tax) && (subTotal*items?.tax/100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2,})}
                                            </> 
                                            : 
                                            <>
                                                {items?.tax && taxValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2,})}
                                            </> } Pi</CsTextRight>
                                        </Row>
                                    }
                                    {( Number(items?.discount) > 0 ) &&
                                         <Row mt="16px" style={{justifyContent: "space-between"}}>
                                            <CsTextLeft>{stateText.text_discount}: ({items?.discount} {items?.discountType === 1 ? "%" : "Pi"})</CsTextLeft>
                                            <CsTextRight bold>{items?.discountType === 1 ? 
                                            <>
                                                {(subTotal && items?.discount && items?.tax) && (discountValue*(subTotal + isTaxValue )/100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2,})}
                                            </> : 
                                            <>
                                                {items?.discount && discountValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2,})}
                                            </>
                                            } Pi</CsTextRight>
                                        </Row>
                                    }
                                    
                                    { ( Number(items?.shipping) > 0 ) &&
                                         <Row mt="16px" style={{justifyContent: "space-between"}}>
                                            <CsTextLeft>{stateText.text_shipping}</CsTextLeft>
                                            <CsTextRight bold>{items?.shipping && shippingValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2,})} Pi</CsTextRight>
                                        </Row>
                                    }
 
                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.text_total}</CsTextLeft>
                                        { (!subTotal || !items?.discount || !items?.tax || !items?.shipping) ?
                                            <CsTextRight>0</CsTextRight>
                                        :
                                            <CsTextRight bold>{(subTotal && items?.discount && items?.tax && items?.shipping) && totalFinaly.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2,})} Pi</CsTextRight>
                                        }
                                    </Row>

                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.text_allowances}</CsTextLeft>
                                        { !items?.amountPaid ?
                                            <CsTextRight>- 0</CsTextRight>
                                        :
                                            <CsTextRight bold>-{items?.amountPaid && items?.amountPaid.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2,})} Pi</CsTextRight>
                                        }
                                    </Row>

                                    <Row mt="16px" style={{justifyContent: "space-between"}}>
                                        <CsTextLeft>{stateText.text_amount_due}</CsTextLeft>
                                        { (!totalFinaly) ?
                                            <CsTextRight>0</CsTextRight>
                                        :
                                            <CsTextRight bold>{balanceDue && balanceDue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2,})} Pi</CsTextRight>
                                        }
                                    </Row>
                                </CsContentInfo>
                            </WContent>
                            <WAction>
                                <CsNavItem>
                                    <CsButton onClick={()=> navigate(`/newInvoice`)}>
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