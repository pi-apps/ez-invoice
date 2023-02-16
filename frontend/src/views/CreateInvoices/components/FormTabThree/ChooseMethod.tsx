import { Button, Flex, Input, Text } from '@devfedeltalabs/pibridge_uikit'
import { AddIcon2, CloseIcon } from 'components/Svg'
import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import styled from 'styled-components'

const ChooseMethod = ({isPercent, setIsPercent, activeTax,setActiveTax, typeTax, typeDiscount, setTypeTax, setTypeDiscount, activeDiscount, setActiveDiscount , typeShipping, setTypeShipping, control, setValue }) => {

//   const [activeTax, setActiveTax ] = useState<number>(0)
// const [activeDiscount, setActiveDiscount ] = useState<number>(1)

  return (
    <Flex flexDirection="column" width="100%">
        {typeTax === true && (
            <Flex width="100%" alignItems="center" justifyContent="space-between">
                <CsTextLeft>Tax</CsTextLeft>
                <CsRowTax>
                    <CsRowTaxLeft>
                        <CsButton isActive={activeTax === 1 ? !false : false } onClick={() => setActiveTax(1)}>%</CsButton>
                        <CsButton isActive={activeTax  === 2 ? !false : false} onClick={() => setActiveTax(2)}>Pi</CsButton>
                    </CsRowTaxLeft>
                    <CsRowTaxRight>
                        <WrapInput>
                            <Controller
                                control={control}
                                name="tax"
                                // rules={rules.invoicenumber}
                                render={({ field }) => (
                                    <>
                                        <CsInput
                                            name="tax"
                                            placeholder={`0.00 ${(activeTax === 1) ? '%' : 'Pi'} `}
                                            value={field.value}
                                            onChange={(event) => setValue("tax", event.target.value)}
                                        />
                                    </>
                                )}
                            />
                        </WrapInput>
                        <CsCloseIcon role="presentation" onClick={() => setTypeTax(false)}>
                            <CloseIcon />
                        </CsCloseIcon>
                    </CsRowTaxRight>
                </CsRowTax>
            </Flex>
        )}  

        {typeDiscount === true && (
        <Flex alignItems="center" justifyContent="space-between" mt='1rem'>
            <CsTextLeft>Discount</CsTextLeft>
            <CsRowTax>
                <CsRowTaxLeft>
                    <CsButton isActive={isPercent === true ? !false : false } onClick={() => setIsPercent(true)}>%</CsButton>
                    <CsButton isActive={isPercent  === false ? !false : false} onClick={() => setIsPercent(false)}>Pi</CsButton>
                </CsRowTaxLeft>
                <CsRowTaxRight>
                    <WrapInput>
                        <Controller
                            control={control}
                            name="discount"
                            // rules={rules.invoicenumber}
                            render={({ field }) => (
                                <>
                                    <CsInput
                                        name="discount"
                                        placeholder={`0.00 ${(isPercent  === true) ? '%' : 'Pi'} `}
                                        value={field.value}
                                        onChange={(event) => setValue("discount", event.target.value)}
                                    />
                                </>
                            )}
                        />
                    </WrapInput>
                    <CsCloseIcon onClick={() => setTypeDiscount(false)}>
                    <CloseIcon />
                    </CsCloseIcon>
                </CsRowTaxRight>
            </CsRowTax>
        </Flex>
    )}

    {typeShipping === true && (
        <Flex alignItems="center" justifyContent="space-between" mt='1rem'>
            <CsTextLeft>Shipping</CsTextLeft>
            <CsRowTax>
                <WrapInput>
                    <Controller
                        control={control}
                        name="shipping"
                        // rules={rules.invoicenumber}
                        render={({ field }) => (
                        <CsInput
                            name="shipping"
                            placeholder="0.00 Pi"
                            value={field.value}
                            onChange={(event) => setValue("shipping", event.target.value)}
                            // onChange={field.onChange}
                        />
                        )}
                    />
                </WrapInput>
            </CsRowTax>
        </Flex>
    )}
    </Flex>
  )
}

const CsAddIcon = styled(AddIcon2)`
  margin-right: 8px;
`

const CsButtonAdd = styled(Button)`
  margin-top: 12px;
  margin-bottom: 12px;
  background: transparent;
`

const CsText = styled(Text)`
  font-size: 12px;
  color: #6B39F4;
  font-weight: 700;
  margin-left: 10px;
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
export default ChooseMethod