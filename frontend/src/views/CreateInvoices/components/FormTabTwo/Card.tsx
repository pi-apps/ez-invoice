import { Flex, Text } from '@devfedeltalabs/pibridge_uikit'
import CloseIcon from 'components/Svg/Icons/CloseIcon'
import { useMemo, useState } from 'react'
import { Controller, useFieldArray } from 'react-hook-form'
import NumberFormat from 'react-number-format'
import styled from 'styled-components'

const Card = ({index, remove, fields, register, control} ) => {
    const handleCloseItem = () => {
      if(fields?.length > 1){
        remove(index)
      }
    }
  const total = useMemo(() => {
    return Number(fields[index].price)*Number(fields[index].quantity)
  },[fields]);

  return (
    <CsWrapperCard>
        <CsHeading>
            <CsFlexHeading>
                <CsTextHeading>Item # {index}</CsTextHeading>
                <CsCloseIcon role="presentation" onClick={handleCloseItem}>
                  <CloseIcon />
                </CsCloseIcon>
            </CsFlexHeading>
        </CsHeading>
        {/* <input {...register(`items.${index}.price` as const)} />; */}
        <CsContent>
            <ContainerInput>
                <WrapInput>
                  <Controller
                    control={control}
                    name={`items[${index}].name`}
                    render={() => (
                        <textarea {...register(`items.${index}.name` as const)} />
                    )}
                    />
                </WrapInput>
            </ContainerInput>

            <CsRowINput>
              <WrapInput>
                  <Controller
                    control={control}
                    name={`items[${index}].quantity`}
                    // rules={rules.sender}
                    render={() => (
                      <input {...register(`items.${index}.quantity` as const)} />
                    )}
                  />
              </WrapInput>
                <WrapInput>
                  <Controller
                      control={control}
                      name={`items[${index}].price`}
                      render={() => (
                        <input {...register(`items.${index}.price` as const)} />
                      )}
                    />
                </WrapInput>
            </CsRowINput>
        </CsContent>

        <Flex mt="24px">
            <Cstitle>Amount: </Cstitle>
            <CsAmount> {total} Pi</CsAmount>
        </Flex>
  </CsWrapperCard>
  )
}
const CsCloseIcon = styled.div`
    background: transparent;
    padding: 0;
    width: 20px;
    height: 20px;
    cursor: pointer;
`
const Cstitle = styled(Text)`
    color: #94A3B8;
`
const CsAmount = styled(Text)`
    color: #0F172A;
    margin-left: 4px;
`

const CsTextHeading = styled(Text)`
    font-size: 16px;
    color: #64748B;
    font-weight: 700;
`

const CsWrapperCard = styled.div`
  width: 100%;
  padding: 21px 12px;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  margin-bottom: 24px;
`
const CsHeading = styled(Text)`
    font-size: 16px;
`
const CsContent = styled(Text)`
    font-size: 16px;
    margin-top: 24px;
`
const ContainerInput = styled(Flex)`
  flex-direction: column;
  width: 100%;
  background-color:#F8F9FD;
  border-radius:8px;
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
export const CsTextArea = styled.textarea`
  background: #F8F9FD;
  border: none;
  padding-left: 10px;
  border-radius: 10px;
  width: 100%;
  height: 100px;
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
const CsFlexHeading = styled(Flex)`
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;
`
const CsRowINput = styled(Flex)`
    margin-top: 24px;
    gap: 10px;
    align-items: center;
    justify-content: space-between;
`
const CsInput = styled.input`
  gap: 8px;
  height: 56px;
  width: 100%;
  padding: 8px 16px;
  background: #F8F9FD;
  border-radius: 12px;
  font-size: 14px;
  border: none;
  color: #0F172A;
  &::placeholder{
    color: #94A3B8;
    font-size: 12px;
    font-weight: 600;
  }
`
const CsNumericFormat = styled(NumberFormat)`
    &:focus-visible {
        outline: none;
    }
    ::placeholder { 
        color:${({ theme }) => theme.colors.text};
        opacity: 1; 
    }
`
export default Card