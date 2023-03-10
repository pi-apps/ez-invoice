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
import { createInvoice_text } from 'translation/languages/createInvoice_text';
import { createInvoiceTranslate } from 'translation/translateArrayObjects';
import BigNumber from 'bignumber.js';
import NumberFormat from 'react-number-format';
import { totalPrice } from 'utils/sumTotalItems';
import { MAX_LENGTH_TERMS } from 'config';

const FormTabThree = ({
  loadingPreview, 
  controlledFields, 
  formState:{errors}, 
  fields, control, 
  setValue, 
  activeTax, 
  activeDiscount, 
  getValues, 
  watch,
  register,
  isMaxDiscount,
  setDiscount,
  isMaxAmountPaid,
  setIsMaxAmountPaid,
  isPositive,
  setIsPositive,
  isMaxLengthTerms,
  setMaxLengthTerms
}) => {
    const [typeTax, setTypeTax] = useState(true)
    const [typeDiscount, setTypeDiscount] = useState(false)
    const [typeShipping, setTypeShipping] = useState(false)
    const [balaneDue, setBalanceDue] = useState(0)
    const taxValue = Number(watch('tax'))
    const shippingValue = Number(watch('shipping'))
    const discountValue = Number(watch('discount')) 
    const amountPaidValue = Number(watch('amountPaid'))
    const termsValue = watch("terms")
    const DataAb = getUser();
    const languageUserApi = DataAb?.language
    
   // Translate
   const [stateText, setStateText] = useState(createInvoice_text);
   const requestTrans = async () => {
     try {
       const resData = await createInvoiceTranslate(languageUserApi);
       setStateText(resData)
     } catch (error) {
       console.log(error)
     }
   }
   useEffect(() => {
     if (languageUserApi) {
       requestTrans();
     } else if (!languageUserApi) {
       setStateText(createInvoice_text);
     }
   }, [languageUserApi]);
  //  for check max length terms 
  useEffect(() => {
    if (termsValue?.length > MAX_LENGTH_TERMS) {
      setMaxLengthTerms(true)
    } else {
      setMaxLengthTerms(false)
    }
    }, [termsValue, MAX_LENGTH_TERMS]);

  //  for check Positive
    useEffect(() => {
      const tax = watch('tax')
      const shipping = watch('shipping')
      const discount = watch('discount')
      const amountPaid = watch('amountPaid')
      if ( new BigNumber(shipping).isLessThan(0) || new BigNumber(tax).isLessThan(0) || new BigNumber(discount).isLessThan(0) || new BigNumber(amountPaid).isLessThan(0) ) {
        setIsPositive(true)
      } else {
        setIsPositive(false)
      }
   
   
    }, [watch('tax'), watch('shipping'), watch('discount'), watch('amountPaid')]);

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    <Flex flexDirection="column">
      <Text fontSize='9px'>{stateText.text_balance_due} = {stateText.text_subtotal} + {stateText.text_tax} - {stateText.text_discount} + {stateText.text_shipping} - {stateText.text_amount_paid}</Text>
    </Flex>,
    { placement: 'top-end', tooltipOffset: [5, 5] },
  )
    


    const subTotal = useMemo(() => {
      return totalPrice(controlledFields)
    },[controlledFields]);

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

    // for check error discount 
    useEffect(()=>{
      if ( new BigNumber(activeDiscount).isEqualTo(1) && new BigNumber(discountValue).isGreaterThan("100")) {
          setDiscount(true)
      } else if ( discountValue < 0 || Number(total) <= 0){
        setDiscount(true)
      } else {
        setDiscount(false)
      }
    },[ discountValue, total, activeDiscount, activeTax ])

    // for check error balance due
    useEffect(()=>{
      if( new BigNumber(amountPaidValue).isGreaterThanOrEqualTo(total)){
        setIsMaxAmountPaid(true)
      } else {
        setIsMaxAmountPaid(false)
      }
    },[ amountPaidValue, total ])

    const converTotal = new BigNumber(total).decimalPlaces(4,1)
    const convertAmountDue = new BigNumber(amountDue).decimalPlaces(4,1)
    const convertSubtotal = new BigNumber(subTotal).decimalPlaces(4,1)
    // end
    return (
      <CsWrapperForm>
        <CsContainer>
              <CsFlex>
                  {/* Notes */}
                  <Flex width='100%'>
                      <CsLabel mt="1rem" color="#64748B">{stateText.text_notes}</CsLabel>
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
                                  placeholder={`${stateText.text_pl_notes}`} 
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
                      <CsLabel mt="2rem" color="#64748B">{stateText.text_terms}</CsLabel>
                  </Flex>

                  <ContainerInput>
                      <WrapInput>
                          <Controller
                              control={control}
                              name="terms"
                              render={({ field }) => (
                              <CsTextArea
                                  name="terms"
                                  placeholder={`${stateText.text_terms_and_conditions}`} 
                                  value={field.value}
                                  onChange={field.onChange}
                              />
                              )}
                          />
                      </WrapInput>
                      { isMaxLengthTerms &&
                        <Text color="red" fontSize='12px' mt="10px">{stateText.text_max_length_is_500_characters}</Text>
                      }
                  </ContainerInput>

                  <hr style={{marginTop: '2rem'}}/>

                  <CsContentInfo>
                      <Row mt="1rem" style={{justifyContent: "space-between"}}>
                          <CsTextLeft>{stateText.text_subtotal}</CsTextLeft>
                          { isNaN(Number(convertSubtotal.toString())) ?
                              "0.0000 PI"
                          :
                              `${Number(convertSubtotal.toString()).toLocaleString('en', { minimumFractionDigits: 4, maximumFractionDigits: 4,})} PI`
                          }
                      </Row>
                      <Row mt="1rem" style={{justifyContent: "space-between"}}>
                          <ChooseMethod 
                              activeDiscount={activeDiscount} 
                              activeTax={activeTax} 
                              control={control} 
                              setValue={setValue} 
                              typeTax={typeTax}
                              typeDiscount={typeDiscount}
                              setTypeTax={setTypeTax} 
                              setTypeDiscount={setTypeDiscount} 
                              typeShipping={typeShipping} 
                              setTypeShipping={setTypeShipping}
                              errors={errors}
                              isMaxDiscount={isMaxDiscount}
                          />
                      </Row>

                      <Row mt="1rem" style={{justifyContent: "flex-end"}}>
                          {
                              typeDiscount === false && (
                                  <CsButtonAddTpye onClick={() => setTypeDiscount(true)}>
                                      <CsAddIcon/>
                                      <CsTextType>{stateText.text_discount}</CsTextType>
                                  </CsButtonAddTpye>
                              )
                          }
                          {typeShipping === false && (
                              <CsButtonAddTpye onClick={() => setTypeShipping(true)}>
                                  <CsAddIcon/>
                                  <CsTextType>{stateText.text_shipping}</CsTextType>
                              </CsButtonAddTpye>
                          )}
                          {typeTax === false && (
                              <CsButtonAddTpye onClick={() => setTypeTax(true)}>
                                  <CsAddIcon/>
                                  <CsTextType>{stateText.text_tax}</CsTextType>
                              </CsButtonAddTpye>
                          )}
                      </Row>

                      <Row mt="1rem" style={{justifyContent: "space-between"}}>
                          <CsTextLeft>{stateText.text_total}</CsTextLeft>
                          <Text style={{wordBreak: 'break-all'}} fontSize='14px'>
                            { isNaN(Number(converTotal.toString())) ?
                              "0.0000 PI"
                            :
                              `${Number(converTotal.toString()).toLocaleString('en', { minimumFractionDigits: 4, maximumFractionDigits: 4,})} PI`                            }

                          </Text>
                      </Row>
                      <Row mt="1rem" style={{justifyContent: "space-between" , alignItems: 'baseline'}}>
                          <CsTextLeft >{stateText.text_amount_paid}</CsTextLeft>
                            <CsAmountPaid>
                              <WrapInputAmountPaid>
                                <Controller
                                    control={control}
                                    name="amountPaid"
                                    render={({ field }) => (
                                      <CsInput  style={{textAlign: 'right', width: '100%', padding: 0}}
                                          name="amountPaid"
                                          placeholder="0.00 PI"
                                          value={field.value}
                                          onBlur={field.onBlur}
                                          onChange={field.onChange}
                                          type="number"
                                      />
                                    )}
                                />
                              </WrapInputAmountPaid>
                            {isMaxAmountPaid ? <Text mt='6px' color='#ff592c' fontSize='12px'>{stateText.text_less_than_total}</Text> : ''}
                            </CsAmountPaid>
                      </Row>

                      <Row mt="1rem" style={{justifyContent: "space-between"}}>
                          <CsTextLeft>{stateText.text_balance_due}
                          <ReferenceElement ref={targetRef}>
                            <HelpIcon color="#94A3B8" />
                          </ReferenceElement> 
                          {tooltipVisible && tooltip}
                          </CsTextLeft>
                          <Text fontSize='14px'>
                            {isNaN(Number(convertAmountDue.toString())) ? 
                                "0.0000 PI"
                            : 
                              <>
                                {`${Number(convertAmountDue.toString()).toLocaleString('en', { minimumFractionDigits: 4, maximumFractionDigits: 4,})} PI`}
                              </> 
                            }
                          </Text>
                      </Row>
                  </CsContentInfo>
              </CsFlex>
        </CsContainer>
        <CsSubTotal>
          <CsButtonAdd
            disabled={isMaxDiscount || isMaxAmountPaid || isPositive || isMaxLengthTerms}
          >
            <CsText>{stateText.text_preview} </CsText>
          </CsButtonAdd>
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
  transform: translateY(-1px);
  svg{
    width: 17px;
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
    /* height: fit-content; */
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