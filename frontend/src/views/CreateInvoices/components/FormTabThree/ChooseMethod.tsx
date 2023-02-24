import { Button, Flex, HelpIcon, Input, Text, useTooltip } from '@devfedeltalabs/pibridge_uikit'
import ErrorMessages from 'components/ErrorMessages/ErrorMessage'
import { AddIcon2, CloseIcon } from 'components/Svg'
import React, { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import styled from 'styled-components'
import { Translate } from "react-auto-translate";
import { GetTranslateHolder } from 'hooks/TranSlateHolder'
import { getUser } from 'state/user'
import { createInvoice_text } from 'translation/languages/createInvoice_text'
import { createInvoiceTranslate } from 'translation/translateArrayObjects'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'state'
import { getActiveDiscount, getActiveTax } from 'state/invoice/actions'

const ChooseMethod = ({ 
    errors,
    activeTax,
    typeTax, 
    typeDiscount, 
    setTypeTax, 
    setTypeDiscount, 
    activeDiscount, 
    typeShipping, 
    setTypeShipping, 
    control, 
    setValue,
    isMaxDiscount,
}) => {

    const DataAb = getUser();
    const languageUserApi = DataAb?.language
   // Translate
   const [stateText, setStateText] = useState(createInvoice_text);
   const dispatch = useDispatch<AppDispatch>()
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


    const { targetRef, tooltip, tooltipVisible } = useTooltip(
        <Flex flexDirection="column">
        <Text fontSize='9px'>{stateText.text_discount_before_tax}</Text>
        </Flex>,
        { placement: 'top-end', tooltipOffset: [5, 5] },
    )

    return (
      <Flex flexDirection="column" width="100%">
          {typeTax === true && (
              <Flex width="100%" alignItems="center" justifyContent="space-between">
                  <CsTextLeft>{stateText.text_tax}</CsTextLeft>
                  <ContainerInput>
                      <CsRowTax>
                          <CsRowTaxLeft>
                              <CsButton isActive={activeTax === 1 ? !false : false } onClick={() => dispatch(getActiveTax({ isTaxPercent:1 }))}>%</CsButton>
                              <CsButton isActive={activeTax  === 2 ? !false : false} onClick={() => dispatch(getActiveTax({ isTaxPercent:2 }))}>Pi</CsButton>
                          </CsRowTaxLeft>
                          <CsRowTaxRight>
                              <WrapInput>
                                  <Controller
                                      control={control}
                                      name="tax"
                                      render={({ field }) => (
                                          <>
                                              <CsInput
                                                  name="tax"
                                                  onBlur={field.onBlur}
                                                  placeholder={`0.00 ${(activeTax === 1) ? '%' : 'Pi'} `}
                                                  value={field.value}
                                                  onChange={field.onChange}
                                                  type='number'
                                                  min={0}
                                              />
                                          </>
                                      )}
                                  />
                              </WrapInput>
                              <CsCloseIcon role="presentation" onClick={() => {setTypeTax(false); setValue("tax", "0")} }>
                                  <CloseIcon />
                              </CsCloseIcon>
                          </CsRowTaxRight>
                      </CsRowTax>
                      <ErrorMessages errors={errors} name="tax" />
                  </ContainerInput>
              </Flex>
          )}  

          {typeDiscount === true && (
          <Flex alignItems="baseline" justifyContent="space-between" mt='1rem'>
              <CsTextLeft>{stateText.text_discount}
                <ReferenceElement ref={targetRef}>
                    <HelpIcon color="#94A3B8" />
                </ReferenceElement> 
                {tooltipVisible && tooltip}
              </CsTextLeft>
              <ContainerInput style={{alignItems: 'flex-end'}}>
                  <CsRowTax>
                      <CsRowTaxLeft>
                          <CsButton isActive={activeDiscount === 1 ? !false : false } onClick={() => dispatch(getActiveDiscount({ isDiscountPercent:1 })) }>%</CsButton>
                          <CsButton isActive={activeDiscount  === 2 ? !false : false} onClick={() => dispatch(getActiveDiscount({ isDiscountPercent:2 })) }>Pi</CsButton>
                      </CsRowTaxLeft>
                      <CsRowTaxRight>
                          <WrapInput>
                              <Controller
                                  control={control}
                                  name="discount"
                                  render={({ field }) => (
                                      <>
                                          <CsInput
                                              name="discount"
                                              onBlur={field.onBlur}
                                              placeholder={`0.00 ${(activeDiscount  === 1) ? '%' : 'Pi'} `}
                                              value={field.value}
                                              onChange={field.onChange}
                                              type='number'
                                          />
                                      </>
                                  )}
                              />
                          </WrapInput>
                          <CsCloseIcon onClick={() => { setTypeDiscount(false); setValue("discount", "0")}}>
                          <CloseIcon />
                          </CsCloseIcon>
                      </CsRowTaxRight>
                  </CsRowTax>
                  {/* <ErrorMessages errors={errors} name="discount" /> */}
                  {isMaxDiscount ? <Text mt='6px' color='#ff592c' fontSize='12px'>{stateText.text_less_than_subtotal_and_tax}</Text> : ''}
              </ContainerInput>
          </Flex>
      )}

      {typeShipping === true && (
          <Flex alignItems="center" justifyContent="space-between" mt='1rem'>
              <CsTextLeft>{stateText.text_shipping}</CsTextLeft>
              <ContainerInput>
                  <CsRowTax>
                      <WrapInputShipping>
                          <Controller
                              control={control}
                              name="shipping"
                              render={({ field }) => (
                              <CsInput
                                  name="shipping"
                                  onBlur={field.onBlur}
                                  placeholder="0.00 Pi"
                                  value={field.value}
                                  onChange={field.onChange}
                                  type='number'
                              />
                              )}
                          />
                      </WrapInputShipping>
                      <CsCloseIcon onClick={() => { setTypeShipping(false); setValue("shipping", 0) } }>
                          <CloseIcon />
                      </CsCloseIcon>
                      </CsRowTax>
                  <ErrorMessages errors={errors} name="shipping" />
              </ContainerInput>
          </Flex>
      )}
      </Flex>
    )
}

const ReferenceElement = styled.div`
  display: inline-block;
  align-items:baseline;
  margin-left:4px; 
  cursor: pointer;
  color: text;
  transform: translateY(-1px);
  svg{
    width: 17px;
  }
`
const CsCloseIcon = styled.div`
    background: transparent;
    padding: 0;
    width: 20px;
    height: 20px;
    cursor: pointer;
    /* margin-left: 10px; */
`
const CsButton = styled.div<{isActive:boolean}>`
    padding:9px;
    cursor: pointer;
    display: flex;
    margin: 0 auto;
    align-items: center;
    border-radius: 10px;
    font-weight: 700;
    width: 31px;
    height: 28px;
    font-size: 12px;
    background: ${({ isActive }) => isActive ? "#6B39F4" : '#EDEEF1'};
    color: ${({ isActive }) => isActive ? "#EDEEF1" : '#94A3B8'};
    &:last-child{
        margin-left: 10px;
    }
`
const CsRowTaxLeft = styled(Flex)`
    align-items: center;
`
const CsRowTaxRight = styled(Flex)`
    align-items: center;
`
const CsTextLeft = styled(Text)`
  font-weight: 500;
  font-size: 12px;
  color: #94A3B8;
  font-size: 12px;
`
const CsRowTax = styled(Flex)`
    align-items: center;
    justify-content: space-between;
    padding: 8px 16px;
    gap: 8px;
    max-width: 220px;
    width: 100%;
    height: 56px;
    background: #F8F9FD;
    border-radius: 12px;
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
const WrapInputShipping = styled(Flex)`
  position: relative;
  background-color:#F8F9FD;
  border-radius: 10px;
  width: 100%;
  input{
    padding: 0;
  }
`
const CsInput = styled(Input)`
  background: none;
  text-align: right;
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
const Csunit = styled(Text)`
    font-size: 14px;
    margin-right: 10px;
    transform: translateY(32%);
`
const ContainerInput = styled(Flex)`
  flex-direction: column;
  border-radius:8px;
`
export default ChooseMethod