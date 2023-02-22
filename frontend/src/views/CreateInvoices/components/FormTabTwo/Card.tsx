import { Flex, Text } from '@devfedeltalabs/pibridge_uikit'
import CloseIcon from 'components/Svg/Icons/CloseIcon'
import { useContext, useEffect, useMemo, useState } from 'react'
import { Controller, useFieldArray } from 'react-hook-form'
import NumberFormat from 'react-number-format'
import styled from 'styled-components'
import { Translate } from "react-auto-translate";
import { GetTranslateHolder } from 'hooks/TranSlateHolder'
import { getUser } from 'state/user'

const Card = ({index,item, remove, fields, register, control } ) => {
  console.log('control' , control?._formState?.touchedFields?.items?.[0]?.name === true && item.name === '')
    const priceNumber = Number(item?.price)
    const quantityNumber = Number(item?.quantity)
    const handleCloseItem = () => {
      if(fields?.length > 1){
        remove(index)
      }
    }

    const DataAb = getUser();
    const languageUserApi = DataAb?.language

    const listTextPlaceHolder = {
      name: "Description of service or product",
      item: "Item",
      please_input_alphabet: "Please input alphabet",
      max_character_100: "Max length is 100 characters",
      please_input_number: "Please input number",
      description_requeried: "Description is required",
      greater_than_0: "Please input number greater than 0",
      amount: "Amount",
    };

    const [stateTextPlaceholder, setStateTextPlaceholder] = useState(listTextPlaceHolder);

    const fcTransLateText = async (language) => {
        const resName = await GetTranslateHolder(
          listTextPlaceHolder.name,
          language
        );
        const resItem = await GetTranslateHolder(
          listTextPlaceHolder.item,
          language
        );
        const resAlphabet = await GetTranslateHolder(
          listTextPlaceHolder.please_input_alphabet,
          language
        );
        const res100 = await GetTranslateHolder(
          listTextPlaceHolder.max_character_100,
          language
        );
        const resInputNumber = await GetTranslateHolder(
          listTextPlaceHolder.please_input_number,
          language
        );
        const resDesRequired = await GetTranslateHolder(
          listTextPlaceHolder.description_requeried,
          language
        );
        const resThan0 = await GetTranslateHolder(
          listTextPlaceHolder.greater_than_0,
          language
        );
        const resAmount = await GetTranslateHolder(
          listTextPlaceHolder.amount,
          language
        );
      setStateTextPlaceholder({
        name: resName,
        item: resItem,
        please_input_alphabet: resAlphabet,
        description_requeried: resDesRequired,
        greater_than_0: resThan0,
        max_character_100: res100,
        please_input_number: resInputNumber,
        amount: resAmount,
      });
    };
  
    useEffect(() => {
      if (!languageUserApi) {
        fcTransLateText('en')
      } else fcTransLateText(languageUserApi)
    }, [languageUserApi]);
    
    
  const total = useMemo(() => {
    return Number(fields[index].price)*Number(fields[index].quantity)
  },[fields]);

  return (
    <CsWrapperCard>
        <CsHeading>
            <CsFlexHeading>
                <CsTextHeading>{stateTextPlaceholder.item} # {index + 1}</CsTextHeading>
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
                    defaultValue=""
                    render={({ field }) => (
                        <CsTextArea
                          onChange={field.onChange} 
                          onBlur={field.onBlur} 
                          placeholder={`${stateTextPlaceholder.name}`} 
                          {...register(`items.${index}.name` as const)} 
                        />
                    )}
                  />
                </WrapInput>
            </ContainerInput>
            {item.name === ' ' ? <Text mt='6px' color='#ff592c' fontSize='12px'>{stateTextPlaceholder.please_input_alphabet}</Text> : item.name.length > 100 && <Text mt='6px' color='#ff592c' fontSize='12px'>{stateTextPlaceholder.max_character_100}</Text> 
            || 
            <>
              {(control?._formState?.touchedFields?.items?.[0]?.name === true && item.name === '') && <Text mt='6px' color='#ff592c' fontSize='12px'>{stateTextPlaceholder.description_requeried}</Text>}
            </>
            }
            <CsRowInput>
              <ContainerInputQuantity>
                <WrapInput>
                    <Controller
                      control={control}
                      name={`items[${index}].quantity`}
                      render={({field}) => (
                        <CsInput type='number'
                          onBlur={field.onBlur}
                          placeholder='1' {...register(`items.${index}.quantity` as const, 
                        )} />
                        )}
                        />
                </WrapInput>
                {(control?._formState?.touchedFields?.items?.[0]?.quantity === true && item.quantity === '') ? <Text mt='6px' color='#ff592c' fontSize='12px'>{stateTextPlaceholder.please_input_number}</Text> : 
                  <>
                    {(Number(item.quantity) < 0) && <Text mt='6px' color='#ff592c' fontSize='12px'>{stateTextPlaceholder.greater_than_0}</Text>}
                  </>
                }
              </ContainerInputQuantity>

              <ContainerInputQuantity>
                <WrapInput>
                    <Controller
                        control={control}
                        name={`items[${index}].price`}
                        render={({field}) => (
                          <CsInput type='number' onBlur={field.onBlur} placeholder='0.00 Pi' {...register(`items.${index}.price` as const,
                          {
                            // valueAsNumber: true,
                            pattern: "^[0-9\b]+$",
                          }
                          )} />
                        )}
                      />
                </WrapInput>
                  {(control?._formState?.touchedFields?.items?.[0]?.price === true && item.price === '') ? <Text mt='6px' color='#ff592c' fontSize='12px'>{stateTextPlaceholder.please_input_number}</Text> : 
                  <>
                    {(Number(item.price) < 0) && <Text mt='6px' color='#ff592c' fontSize='12px'>{stateTextPlaceholder.greater_than_0}</Text>}
                  </>}
              </ContainerInputQuantity>
            </CsRowInput>
        </CsContent>

        <Flex mt="24px">
            <Cstitle><Translate>{stateTextPlaceholder.amount}: </Translate></Cstitle>
            <CsAmount>
              {total && typeof total === 'number' ? `${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2,})} Pi` : '0 Pi'}  
            </CsAmount>
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
    font-size: 14px;
    word-break: break-all;
`

const CsTextHeading = styled(Text)`
    font-size: 14px;
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
  width: 100%;
  height: auto;
  border-radius:8px;
  flex-direction: column;
  background-color:#F8F9FD;
`

const WrapInput = styled(Flex)`
  position: relative;
  background-color:#F8F9FD;
  border-radius: 10px;
  height: auto;
  width: 100%;
  input{
    padding: 10px;
  }
`

export const CsTextArea = styled.input`
  background: #F8F9FD;
  border: none;
  padding-left: 10px;
  border-radius: 10px;
  width: 100%;
  height: 56px;
  max-height: 100%;
  min-height: 56px;
  resize: unset;
  padding: 10px;
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
const CsRowInput = styled(Flex)`
    margin-top: 24px;
    gap: 10px;
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

const ContainerInputQuantity = styled.div`
  width: 50%;
`
export default Card