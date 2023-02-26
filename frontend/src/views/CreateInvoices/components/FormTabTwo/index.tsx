import { Flex, Text } from '@devfedeltalabs/pibridge_uikit'
import Row from 'components/Layout/Row'
import { AddIcon } from 'components/Svg'
import { LanguagesContext } from 'contexts/Translate'
import { GetTranslateHolder } from 'hooks/TranSlateHolder'
import { useContext, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import Card from './Card'
import { Translate } from "react-auto-translate";
import { getUser } from 'state/user'
import { createInvoice_text } from 'translation/languages/createInvoice_text'
import { createInvoiceTranslate } from 'translation/translateArrayObjects'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'state'
import { tabActiveNewInvoice } from 'state/invoice/actions'
import { totalPrice } from 'utils/sumTotalItems'
import BigNumber from 'bignumber.js'

const FormTabTwo = ({
  isActive, 
  formState: {errors, touchedFields}, 
  append, 
  controlledFields, 
  remove, 
  register, 
  control }) => {
  const dispatch = useDispatch<AppDispatch>()

  const userData = getUser();
  const languageUserApi = userData?.language
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
      return totalPrice(controlledFields)
    },[controlledFields]);
    const handleMinusTabActive = () => {
      if(isActive > 1 && isActive <= 3){
          dispatch(tabActiveNewInvoice({isActive: isActive - 1}))
      }
  }

  const handlePlusTabActive = () => {
      if( 1 <= isActive && isActive < 3 ){
          dispatch(tabActiveNewInvoice({isActive: isActive + 1}))
      }
  }
  const convertTotal = new BigNumber(total).decimalPlaces(4,1)
  return (
    <CsWrapperForm>
      <CsContainer>
      {controlledFields.map((item, index) => {
          return (
              <Card 
                item={item} 
                index={index} 
                remove={remove} 
                fields={controlledFields} 
                register={register} 
                control={control} 
                errors={errors}
              />
          );
        })}
      </CsContainer>

      <CsSubTotal>
        <CsButtonAdd onClick={() => {
          append({ name: "", quantity: "", price: "" });
        }}>
          <CsAddIcon />
          <CsText>{stateText.text_line_item}</CsText>
        </CsButtonAdd>
        <hr style={{margin: '10px 0'}} />
        <Row mt="16px" style={{justifyContent: "space-between"}}>
            <CsTextLeft>{stateText.text_subtotal}:</CsTextLeft>
            <CsTextRight bold>
              {Number(convertTotal) > 0 ? `${Number(convertTotal.toString()).toLocaleString('en', { minimumFractionDigits: 4, maximumFractionDigits: 4,})} PI` : '0 PI'}
              </CsTextRight>
        </Row>
      </CsSubTotal>
      <ContainerSubTab>
                <CsButton isActive={isActive > 1} role="presentation" onClick={handleMinusTabActive}>
                  {stateText.text_previous}
                </CsButton>

                <CsButton isActive={isActive < 3} role="presentation" onClick={handlePlusTabActive}>
                  {stateText.text_next}
                </CsButton>
            </ContainerSubTab>
      </CsWrapperForm>
  )
}

const TabButton = styled(Flex)<{isActive:boolean}>`
    cursor: pointer;
    justify-content:center;
    align-items:center;
    height: 29px;
    width: 29px;
    font-size: 12px;
    font-weight: 700;
    border-radius: 50%;
    margin: 0 5px;
    color: ${({ isActive }) => isActive ? "#FFFFFF" : '#94A3B8'};
    background: ${({ isActive }) => isActive ? "#6B39F4" : '#F8F9FD'};
`
const CsTab = styled(Flex)`
    width: fit-content;
    align-items: center;
`
const ContainerSubTab = styled(Flex)`
    width:100%;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
    margin-top:1rem;
    margin-bottom:1rem;
    padding: 0 24px
`

const CsButton = styled.div<{isActive:boolean}>`
    cursor: ${({ isActive }) => isActive ? "pointer" : "default"};
    color: ${({ isActive }) => isActive ? "#F8F9FD" : '#94A3B8'};
    background:#6B39F4;
    border-radius: 10px;
    font-size: 20px;
    padding: 10px;
    font-size: 14px;
    font-weight: 700;
    min-width: 100px;
    text-align: center;
    &:hover{
        color: ${({ isActive }) => isActive && "#F8F9FD" };
    }
    &:active{
      transform: translateY(1px);
        color: #F8F9FD;
    }
`

const CsTextLeft = styled(Text)`
  font-weight: 500;
  font-size: 12px;
  color: #94A3B8;
  font-size: 16px;
`
const CsTextRight = styled(Text)`
  font-weight: 500;
  font-size: 16px;
  color: #0F172A;
  word-break: break-all;
`

const CsAddIcon = styled(AddIcon)`
  margin-right: 10px;
`

const CsText = styled(Text)`
  font-size: 12px;
  color: #FFFFFF;
  font-weight: 700;
  margin-left: 10px;
`

const CsButtonAdd = styled.div`
  margin-top: 12px;
  margin-bottom: 12px;
  border-bottom: 1px solid #E2E8F0;
  background: #6B39F4;
  border-radius: 6px;
  width: fit-content;
  align-items: center;
  width: fit-content;
  height: 35px;
  padding: 0 10px;
  display: flex;
  cursor: pointer;
`

const CsSubTotal = styled.div`
  padding: 0 24px;
  flex-direction: column;
`

const CsWrapperForm = styled.div`
width: 100%;
`

const CsContainer = styled(Flex)`
    height: 100%;
    flex-direction: column;
    overflow: scroll;
    padding: 0 24px;
    width: 100%;
    min-height: 50vh;
`

export default FormTabTwo