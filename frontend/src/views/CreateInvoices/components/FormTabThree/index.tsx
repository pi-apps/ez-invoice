import { AutoRenewIcon, Button, Flex, HelpIcon, Input, Text, useTooltip } from '@devfedeltalabs/pibridge_uikit';
import ErrorMessages from "components/ErrorMessages/ErrorMessage";
import Row from 'components/Layout/Row';
import { useContext } from 'react';
import { AddIcon2 } from 'components/Svg';
import { GetTranslateHolder } from 'hooks/TranSlateHolder';
import { useEffect, useMemo, useState } from 'react';
import Navbar from 'react-bootstrap/esm/Navbar';
import styled from 'styled-components';
import { Controller } from 'react-hook-form';
import ChooseMethod from './ChooseMethod';
import { getUser } from 'state/user';

const FormTabThree = ({loadingPreview, controlledFields, formState:{errors}, fields, control, setValue, activeTax, setActiveTax, activeDiscount, setActiveDiscount, getValues }) => {
    const [typeTax, setTypeTax] = useState(true)
    const [typeDiscount, setTypeDiscount] = useState(false)
    const [typeShipping, setTypeShipping] = useState(false)
    const [balaneDue, setBalanceDue] = useState(0)
    const taxValue =  Number(getValues('tax'))
    const shippingValue =  Number(getValues('shipping'))
    const discountValue =  Number(getValues('discount'))
    const amountPaidValue =  Number(getValues('amountPaid'))

    const DataAb = getUser();
    const languageUserApi = DataAb?.language

    const { targetRef, tooltip, tooltipVisible } = useTooltip(
      <Flex flexDirection="column">
        <Text fontSize='9px'>Balance Due = Sub total + Tax - Discount + Shipping - Amount paid</Text>
      </Flex>,
      { placement: 'top-end', tooltipOffset: [5, 5] },
    )

    const [stateTextPlaceholder, setStateTextPlaceholder] = useState({
      notes: "Description of service or product",
    });
  
    const listTextPlaceHolder = {
      // text
      notes_t: "Notes",
      terms_t: "Terms",
      subtotal_t: "Subtotal",
      tax_t: "Tax",
      total_t: "Total",
      discount_t: "Discount",
      shipping_t: "Shipping",
      amount_paid_t: "Amount paid",
      balance_due_t: "Balance Due",
      preview: "Preview",

      // placeholder
      notes: "Description of service or product",
    };

    const [stateText, setStateText] = useState(listTextPlaceHolder);
  
    const fcTransLateText = async (language) => {
      const resSenderEmail = await GetTranslateHolder(
          listTextPlaceHolder.notes,
          language
        );
        const resterms_t = await GetTranslateHolder(
          listTextPlaceHolder.terms_t,
          language
        );
        const resSubtotal_t = await GetTranslateHolder(
          listTextPlaceHolder.subtotal_t,
          language
        );
        const resTax_t = await GetTranslateHolder(
          listTextPlaceHolder.tax_t,
          language
        );
        const resTotal_t = await GetTranslateHolder(
          listTextPlaceHolder.total_t,
          language
        );
        const resDiscount_t = await GetTranslateHolder(
          listTextPlaceHolder.discount_t,
          language
        );
        const resShipping_t = await GetTranslateHolder(
          listTextPlaceHolder.shipping_t,
          language
        );
        const resAmountPaid_t = await GetTranslateHolder(
          listTextPlaceHolder.amount_paid_t,
          language
        );
        const resNotes_t= await GetTranslateHolder(
          listTextPlaceHolder.notes_t,
          language
        );
        const resBalance_t = await GetTranslateHolder(
          listTextPlaceHolder.balance_due_t,
          language
        );
        const resPreview_t = await GetTranslateHolder(
          listTextPlaceHolder.preview,
          language
        );
      setStateText({
        notes: resSenderEmail,
        amount_paid_t: resAmountPaid_t,
        balance_due_t: resBalance_t,
        discount_t: resDiscount_t,
        notes_t: resNotes_t,
        shipping_t: resShipping_t,
        subtotal_t: resSubtotal_t,
        tax_t: resTax_t,
        terms_t: resterms_t,
        total_t: resTotal_t,
        preview: resPreview_t,
      });
    };
  
    useEffect(() => {
      if (!languageUserApi) {
        fcTransLateText('en')
      } else fcTransLateText(languageUserApi)
    }, [languageUserApi]);
    
    const totalPrice = (fields) => {
      return fields?.reduce((sum, i) => {
        if(i.price === undefined || i.quantity === undefined){
          return 0
        } else{
          return (
            sum + i.price * i.quantity
          )
        }
      },0)
    }

    const total = useMemo(() => {
      return totalPrice(controlledFields)
    },[controlledFields]);
    

    const taxValuePercent = taxValue * total / 100 
    const DiscountValuePercent = discountValue * (total + taxValuePercent) / 100 
    const isDiscountValuePercent = discountValue <= 100 ? DiscountValuePercent : total
    const isDiscount = (discountValue < total) ? discountValue : total
    const totalFinal = (total) => {
      if(activeTax === 2 && activeDiscount === 2){
        return total + taxValue + shippingValue - isDiscount
      } else if(activeTax === 2 && activeDiscount === 1){
        return total + taxValue + shippingValue - isDiscountValuePercent
      } else if(activeTax === 1 && activeDiscount === 1){
        return total + taxValuePercent + shippingValue - isDiscountValuePercent
      } else if(activeTax === 1 && activeDiscount === 2){
        return total + taxValuePercent + shippingValue - isDiscount
      }
    } 
    const totalFinaly = totalFinal(total)
    const balanceDue = amountPaidValue < totalFinaly ? totalFinaly - amountPaidValue : 0

    useEffect(() => {
      setBalanceDue(amountPaidValue < totalFinaly ? totalFinaly - amountPaidValue : 0)
    },[amountPaidValue])
    
  return (
    <CsWrapperForm>
      <CsContainer>
            <CsFlex>
                {/* Notes */}
                <Flex width='100%'>
                    <CsLabel mt="1rem" color="#64748B">{stateText.notes_t}</CsLabel>
                </Flex>
                <ContainerInput>
                    <WrapInput>
                        <Controller
                            control={control}
                            name="notes"
                            // rules={rules.invoicenumber}
                            render={({ field }) => (
                            <CsTextArea
                                name="notes"
                                // type="text"
                                onBlur={field.onBlur}
                                placeholder={`${stateText.notes}`} 
                                value={field.value}
                                onChange={field.onChange}
                            />
                            )}
                        />
                    </WrapInput>
                    <ErrorMessages errors={errors} name="notes" />
                </ContainerInput>
                
                  {/* Terms */}
                  <Flex width='100%'>
                    <CsLabel mt="2rem" color="#64748B">{stateText.terms_t}</CsLabel>
                </Flex>

                <ContainerInput>
                    <WrapInput>
                        <Controller
                            control={control}
                            name="terms"
                            render={({ field }) => (
                            <CsTextArea
                                name="terms"
                                placeholder="1"
                                value={field.value}
                                onChange={field.onChange}
                            />
                            )}
                        />
                    </WrapInput>
                    <ErrorMessages errors={errors} name="terms" />
                </ContainerInput>

                <hr style={{marginTop: '2rem'}}/>

                <CsContentInfo>
                    <Row mt="1rem" style={{justifyContent: "space-between"}}>
                        <CsTextLeft>{stateText.subtotal_t}</CsTextLeft>
                        <CsTextRight fontSize='14px' bold>{!total ? 0 : <>
                          {total && typeof total === 'number'  ? `${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2,})} Pi`: '0 Pi'}
                        </>}</CsTextRight>
                    </Row>
                    <Row mt="1rem" style={{justifyContent: "space-between"}}>
                        <ChooseMethod 
                            setActiveDiscount={setActiveDiscount} 
                            activeDiscount={activeDiscount} 
                            activeTax={activeTax} 
                            setActiveTax={setActiveTax} 
                            control={control} 
                            setValue={setValue} 
                            typeTax={typeTax}
                            typeDiscount={typeDiscount}
                            setTypeTax={setTypeTax} 
                            setTypeDiscount={setTypeDiscount} 
                            typeShipping={typeShipping} 
                            setTypeShipping={setTypeShipping}
                            errors={errors}
                        />
                    </Row>

                    <Row mt="1rem" style={{justifyContent: "flex-end"}}>
                        {
                            typeDiscount === false && (
                                <CsButtonAddTpye onClick={() => setTypeDiscount(true)}>
                                    <CsAddIcon/>
                                    <CsTextType>{stateText.discount_t}</CsTextType>
                                </CsButtonAddTpye>
                            )
                        }
                        {typeShipping === false && (
                            <CsButtonAddTpye onClick={() => setTypeShipping(true)}>
                                <CsAddIcon/>
                                <CsTextType>{stateText.shipping_t}</CsTextType>
                            </CsButtonAddTpye>
                        )}
                        {typeTax === false && (
                            <CsButtonAddTpye onClick={() => setTypeTax(true)}>
                                <CsAddIcon/>
                                <CsTextType>{stateText.tax_t}</CsTextType>
                            </CsButtonAddTpye>
                        )}
                    </Row>

                    <Row mt="1rem" style={{justifyContent: "space-between"}}>
                        <CsTextLeft>{stateText.total_t}</CsTextLeft>
                        <Text style={{wordBreak: 'break-all'}} fontSize='14px'>{!totalFinaly ? 0 : <>
                          {`${totalFinaly.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2,})} Pi`}
                        </> }</Text>
                    </Row>
                    <Row mt="1rem" style={{justifyContent: "space-between"}}>
                        <CsTextLeft >{stateText.amount_paid_t}</CsTextLeft>
                          <CsAmountPaid>
                            <WrapInputAmountPaid>
                              <Controller
                                  control={control}
                                  name="amountPaid"
                                  // rules={rules.invoicenumber}
                                  render={({ field }) => (
                                    <CsInput  style={{textAlign: 'right', width: '100%', padding: 0}}
                                        name="amountPaid"
                                        placeholder="0.00 Pi"
                                        value={field.value}
                                        onBlur={field.onBlur}
                                        // onChange={field.onChange}
                                        onChange={(event) => setValue("amountPaid", event.target.value)}
                                    />
                                  )}
                              />
                            </WrapInputAmountPaid>
                          <ErrorMessages errors={errors} name="amountPaid" />
                          </CsAmountPaid>
                    </Row>

                    <Row mt="1rem" style={{justifyContent: "space-between"}}>
                        <CsTextLeft>{stateText.balance_due_t}
                        <ReferenceElement ref={targetRef}>
                          <HelpIcon color="#94A3B8" />
                        </ReferenceElement> 
                        {tooltipVisible && tooltip}
                        </CsTextLeft>
                        <Text fontSize='14px'>{!balanceDue ? 0 : <>
                          {`${balanceDue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2,})} Pi`}
                          </> }
                        </Text>
                    </Row>
                    {/* <Row mt="1rem" style={{justifyContent: "space-between"}}>
                        <Text color='#94A3B8' fontSize='10px'>Balance due = Sub total + Tax - Discount + Shipping - Amount paid </Text>
                    </Row> */}
                </CsContentInfo>
            </CsFlex>
      </CsContainer>
      <CsSubTotal>
        <CsButtonAdd  endIcon={loadingPreview ? <AutoRenewIcon style={{margin: 0}} spin color="#fff"/> : <CsText>{stateText.preview} </CsText>}></CsButtonAdd>
      </CsSubTotal>
      </CsWrapperForm>
  )
}

const ReferenceElement = styled.div`
  display: inline-block;
  align-items:baseline;
  margin-left:5px; 
  cursor: pointer;
  color: text;
  svg{
    width: 14px;
  }
`

const CsButtonAddTpye = styled(Button)`
  margin-left: 30px;
  background: transparent;
  padding: 0;
`
const CsTextType = styled(Text)`
  font-size: 12px;
  color: #6B39F4;
  font-weight: 700;
  margin-left: 6px;
`

const CsAddIcon = styled(AddIcon2)`
  margin-right: 8px;
`
const CsRowTax = styled(Flex)`
    align-items: center;
    justify-content: space-between;
    padding: 8px 16px;
    gap: 8px;
    width: 213px;
    height: 56px;
    background: #F8F9FD;
    border-radius: 12px;
`
const CsRowTaxLeft = styled(Flex)`
    align-items: center;
`
const CsRowTaxRight = styled(Flex)`
    align-items: center;
`
const CsAmountPaid = styled(Flex)`
    /* background: #F8F9FD; */
    height: fit-content;
    border-radius: 12px;
    font-size: 12px;
    max-width: 220px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
`

const CsFlex = styled(Flex)`
    /* height: calc(100vh - 250px); */
    flex-direction: column;
    overflow: scroll;
    padding: 12px 24px;
    width: 100%;
`

export const FormSubmit = styled.form`
  width: 100%;
`

const CsText = styled(Text)`
  font-size: 12px;
  color: #FFFFFF;
  font-weight: 700;
  margin-left: 10px;
`

const CsButtonAdd = styled(Button)`
  margin-top: 12px;
  margin-bottom: 12px;
  width: 100%;
`

const CsSubTotal = styled.div`
  padding: 0 24px;
  flex-direction: column;
`

const CsWrapperForm = styled.div`
width: 100%;
`
const CsWrapperContent = styled.div`
  padding: 0 24px;
`

const CsContainer = styled(Flex)`
    height: calc(100vh - 330px);
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    overflow: scroll;
    width: 100%;
`
const CsLabel = styled(Text)`
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 14px;
`
const ContainerInput = styled(Flex)`
  flex-direction: column;
  width: 100%;
  /* background-color:#F8F9FD; */
  border-radius:8px;
  /* margin-bottom:1rem; */
`
const WrapInputAmountPaid = styled(Flex)`
  position: relative;
  background-color:#F8F9FD;
  border-radius: 10px;
  width: 100%;
height: 56px;
  padding: 0px 16px;

  /* input{
    padding: 10px;
  } */
`
const WrapInput = styled(Flex)`
  position: relative;
  background-color:#F8F9FD;
  border-radius: 10px;
  width: 100%;
  input{
    padding: 10px;
  }
`

export const CsInput = styled(Input)`
  background: none;
  border: none;
  padding-left: 10px;
  border-radius: 0px;
  width: 100%;
  box-shadow: none;
  font-size:14px;
  height: 56px;
  &::placeholder{
    color: #94A3B8;
    font-weight: 400;
    font-size: 12px;
  }
  :focus:not(:disabled){
    box-shadow:none!important;
  }
`
export const CsTextArea = styled.textarea`
  background: none;
  border: none;
  padding-left: 10px;
  border-radius: 0px;
  width: 327px;
  height: 91px;
  resize: unset;
  padding: 10px;
  width: 100%;
  box-shadow: none;
  font-size:14px;
  &::placeholder{
    color: #94A3B8;
    font-weight: 400;
    font-size: 12px;
  }
  :focus:not(:disabled){
    box-shadow:none!important;
  }
`
const CsContentInfo = styled.div``
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
  white-space: nowrap;
`

export default FormTabThree