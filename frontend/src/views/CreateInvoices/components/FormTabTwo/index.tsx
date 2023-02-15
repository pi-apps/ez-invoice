import { Flex, Text } from '@phamphu19498/pibridge_uikit'
import Row from 'components/Layout/Row'
import { AddIcon } from 'components/Svg'
import { useMemo, useState } from 'react'
import styled from 'styled-components'
import Card from './Card'

const FormTabTwo = ({append, controlledFields, remove, register, control}) => {
 
  const totalPrice = (fields) => {
    return fields.reduce((sum, i) => {
      if(i.price === undefined || i.quantity === undefined){
        return 0
      } else{
        return sum + i.price * i.quantity
      }
    },0)
  }
    const total = useMemo(() => {
      return totalPrice(controlledFields)
    },[controlledFields]);
  return (
    <CsWrapperForm>
      <CsContainer>
      {controlledFields.map((item, index) => {
          return (
              <Card index={index} remove={remove} fields={controlledFields} register={register} control={control} />
          );
        })}
      </CsContainer>

      <CsSubTotal>
        <CsButtonAdd onClick={() => {
          append({ name: "", quantity: "", price: "" });
        }}>
          <CsAddIcon />
          <CsText>Line item</CsText>
        </CsButtonAdd>
        <hr style={{margin: '10px 0'}} />
        <Row mt="16px" style={{justifyContent: "space-between"}}>
            <CsTextLeft>Amount Due</CsTextLeft>
            <CsTextRight bold>{total} Pi</CsTextRight>
        </Row>
      </CsSubTotal>
      </CsWrapperForm>
  )
}

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
  width: 95px;
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
const CsWrapperContent = styled.div`
  padding: 0 24px;
`

const CsContainer = styled(Flex)`
    height: calc(100vh - 400px);
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    overflow: scroll;
    padding: 0 24px;
    width: 100%;
`

export default FormTabTwo