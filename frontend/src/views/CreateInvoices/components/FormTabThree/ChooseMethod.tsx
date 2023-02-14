import { Button, Flex, Text } from '@phamphu19498/pibridge_uikit'
import { AddIcon2, CloseIcon } from 'components/Svg'
import React, { useState } from 'react'
import styled from 'styled-components'

const ChooseMethod = ({typeTax, typeDiscount, setTypeTax, setTypeDiscount, typeShipping, setTypeShipping }) => {
    console.log('typeTax', typeTax)
  const [activeTax, setActiveTax ] = useState<number>(0)
  const [activeShipping, setActiveShipping ] = useState<number>(0)
  const [activeDiscount, setActiveDiscount ] = useState<number>(0)
  return (
    <Flex flexDirection="column" width="100%">
    {typeTax && (
        <Flex width="100%" alignItems="center" justifyContent="space-between">
            <CsTextLeft>Tax</CsTextLeft>
            <CsRowTax>
                <CsRowTaxLeft>
                    <CsButton isActive={activeTax === 0 ? !false : false } onClick={() => setActiveTax(0)}>%</CsButton>
                    <CsButton isActive={activeTax  === 1 ? !false : false} onClick={() => setActiveTax(1)}>Pi</CsButton>
                </CsRowTaxLeft>
                <CsRowTaxRight>
                    {activeTax === 0 ? (
                        <CsText>0 %</CsText>
                    ) : (
                        <CsText>0.00 Pi</CsText>
                    )}
                    <CsCloseIcon onClick={() => setTypeTax(false)}>
                    <CloseIcon />
                    </CsCloseIcon>
                </CsRowTaxRight>
            </CsRowTax>
        </Flex>
    )}
        {typeDiscount && (
        <Flex alignItems="center" justifyContent="space-between" mt='1rem'>
            <CsTextLeft>Discount</CsTextLeft>
            <CsRowTax>
                <CsRowTaxLeft>
                    <CsButton isActive={activeShipping === 0 ? !false : false } onClick={() => setActiveShipping(0)}>%</CsButton>
                    <CsButton isActive={activeShipping  === 1 ? !false : false} onClick={() => setActiveShipping(1)}>Pi</CsButton>
                </CsRowTaxLeft>
                <CsRowTaxRight>
                    {activeShipping === 0 ? (
                        <CsText>0 %</CsText>
                    ) : (
                        <CsText>0.00 Pi</CsText>
                    )}
                    <CsCloseIcon onClick={() => setTypeDiscount(false)}>
                    <CloseIcon />
                    </CsCloseIcon>
                </CsRowTaxRight>
            </CsRowTax>
        </Flex>
    )}

    {typeShipping && (
        <Flex alignItems="center" justifyContent="space-between" mt='1rem'>
            <CsTextLeft>Shipping</CsTextLeft>
            <CsRowTax>
                <CsRowTaxLeft>
                    <CsButton isActive={activeDiscount === 0 ? !false : false } onClick={() => setActiveDiscount(0)}>%</CsButton>
                    <CsButton isActive={activeDiscount  === 1 ? !false : false} onClick={() => setActiveDiscount(1)}>Pi</CsButton>
                </CsRowTaxLeft>
                <CsRowTaxRight>
                    {activeDiscount === 0 ? (
                        <CsText>0 %</CsText>
                    ) : (
                        <CsText>0.00 Pi</CsText>
                    )}
                    <CsCloseIcon onClick={() => setTypeShipping(false)}>
                    <CloseIcon />
                    </CsCloseIcon>
                </CsRowTaxRight>
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
const CsCloseIcon = styled(Button)`
    background: transparent;
    padding: 0;
    width: 20px;
    height: 20px;
    margin-left: 10px;
`
const CsButton = styled(Button)<{isActive:boolean}>`
    padding:0;
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
export default ChooseMethod