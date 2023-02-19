import { Flex, Text } from '@devfedeltalabs/pibridge_uikit'
import CloseIcon from 'components/Svg/Icons/CloseIcon'
import { LanguagesContext } from 'contexts/Translate'
import { GetTranslateHolder } from 'hooks/TranSlateHolder'
import { useContext, useEffect, useMemo, useState } from 'react'
import { Controller, useFieldArray } from 'react-hook-form'
import NumberFormat from 'react-number-format'
import styled from 'styled-components'
import { Translate } from "react-auto-translate";
import ErrorMessages from 'components/ErrorMessages/ErrorMessage'

const Card = ({index, remove, fields, register, control} ) => {

  const { language, setLanguage } = useContext(LanguagesContext);
  const languageStorage  = localStorage.getItem('language');
  const [stateTextPlaceholder, setStateTextPlaceholder] = useState({
    iterm: "Description of service or product",
  });

  const listTextPlaceHolder = {
    iterm: "Description of service or product",
  };

  const changeTextPlaceHolderLg = async () => {
    const resIterm = await GetTranslateHolder(
      listTextPlaceHolder.iterm,
      languageStorage
    );

    setStateTextPlaceholder({
      iterm: resIterm,
    });
  };

  useEffect(() => {
    if (languageStorage === 'en')     
    return setStateTextPlaceholder({
      iterm: "Description of service or product",
      });;
    changeTextPlaceHolderLg()
  }, [languageStorage]);

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
                <CsTextHeading><Translate>Item</Translate> # {index + 1}</CsTextHeading>
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
                    // name={`items[${index}].name`}
                    name='desForm2'
                    render={() => (
                        <CsTextArea placeholder={`${stateTextPlaceholder.iterm}`} {...register(`items.${index}.name` as const,
                        { 
                          required: true,
                          pattern: /^[0-9\b]+$/
                        }
                        )} />
                    )}
                    />
                </WrapInput>
                <ErrorMessages errors={errors} name="desForm2" />
            </ContainerInput>

            <CsRowINput>
              <WrapInput>
                  <Controller
                    control={control}
                    name={`items[${index}].quantity`}
                    render={({field}) => (
                      <CsInput
                      placeholder='1' {...register(`items.${index}.quantity` as const, 
                      { pattern: "/^0|[1-9]\d*$/" },
                      {
                        required: true // JS only: <p>error message</p> TS only support string
                      }
                      )} />
                    )}
                  />
              </WrapInput>
              <WrapInput>
                <Controller
                    control={control}
                    name={`items[${index}].price`}
                    render={() => (
                      <CsInput placeholder='0.00 Pi' {...register(`items.${index}.price` as const, { required: true })} />
                    )}
                  />
              </WrapInput>
            </CsRowINput>
        </CsContent>

        <Flex mt="24px">
            <Cstitle><Translate>Amount:</Translate> </Cstitle>
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