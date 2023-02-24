import { Flex, Text } from '@devfedeltalabs/pibridge_uikit'
import CloseIcon from 'components/Svg/Icons/CloseIcon'
import { useContext, useEffect, useMemo, useState } from 'react'
import { Controller, useFieldArray } from 'react-hook-form'
import NumberFormat from 'react-number-format'
import styled from 'styled-components'
import { getUser } from 'state/user'
import { createInvoice_text } from 'translation/languages/createInvoice_text'
import { createInvoiceTranslate } from 'translation/translateArrayObjects'

const Card = ({index,item, remove, fields, register, control } ) => {
    const priceNumber = Number(item?.price)
    const quantityNumber = Number(item?.quantity)
    const handleCloseItem = () => {
      if(fields?.length > 1){
        remove(index)
      }
    }

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
    
    
  const total = useMemo(() => {
    return Number(fields[index].price)*Number(fields[index].quantity)
  },[fields]);

  return (
    <CsWrapperCard>
        <CsHeading>
            <CsFlexHeading>
                <CsTextHeading>{stateText.text_item} # {index + 1}</CsTextHeading>
                <CsCloseIcon role="presentation" onClick={handleCloseItem}>
                  <CloseIcon />
                </CsCloseIcon>
            </CsFlexHeading>
        </CsHeading>
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
                          placeholder={`${stateText.text_pl_name}`} 
                          {...register(`items.${index}.name` as const)} 
                        />
                    )}
                  />
                </WrapInput>
            </ContainerInput>
            {(item.name.split(' ').length >= 2 && !item.name.trim()) ? <Text mt='6px' color='#ff592c' fontSize='12px'>{stateText.text_please_input_alphabet}</Text> : (item.name.length > 100) && <Text mt='6px' color='#ff592c' fontSize='12px'>{stateText.text_max_character_100}</Text> 
            ||
            <>
              {(control?._formState?.touchedFields?.items?.[0]?.name === true && item.name === '') && <Text mt='6px' color='#ff592c' fontSize='12px'>{stateText.text_description_requeried}</Text>}
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
                {(control?._formState?.touchedFields?.items?.[0]?.quantity === true && item.quantity === '') ? <Text mt='6px' color='#ff592c' fontSize='12px'>{stateText.text_please_input_number}</Text> : 
                  <>
                    {(Number(item.quantity) < 0) && <Text mt='6px' color='#ff592c' fontSize='12px'>{stateText.text_greater_than_0}</Text>}
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
                  {(control?._formState?.touchedFields?.items?.[0]?.price === true && item.price === '') ? <Text mt='6px' color='#ff592c' fontSize='12px'>{stateText.text_please_input_number}</Text> : 
                  <>
                    {(Number(item.price) < 0) && <Text mt='6px' color='#ff592c' fontSize='12px'>{stateText.text_greater_than_0}</Text>}
                  </>}
              </ContainerInputQuantity>
            </CsRowInput>
        </CsContent>

        <Flex mt="24px">
            <Cstitle>{stateText.text_amount}:</Cstitle>
            <CsAmount>
              {total && typeof total === 'number' ? `${total.toLocaleString('en', { minimumFractionDigits: 4, maximumFractionDigits: 4,})} Pi` : '0 Pi'}  
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

export const CsTextArea = styled.textarea`
  background: #F8F9FD;
  border: none;
  padding-left: 10px;
  border-radius: 10px;
  width: 100%;
  height: 100px;
  max-height: 100%;
  min-height: 100px;
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