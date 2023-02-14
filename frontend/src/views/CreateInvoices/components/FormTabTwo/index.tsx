import { Button, Flex, Text } from '@phamphu19498/pibridge_uikit'
import PageFullWidth from 'components/Layout/PageFullWidth'
import Row from 'components/Layout/Row'
import { AddIcon, CloseIcon } from 'components/Svg'
import React, { useState } from 'react'
import styled from 'styled-components'
import Card from './Card'

const FormTabTwo = ({formState, control, setValue }) => {
  const [indexes, setIndexes] = React.useState([]);
  const [ price, setPrice] = useState(0.00)

  const arraydata = [ { name: '', quantity: 0, price: 0 } ]
  const [array, setArray] = useState(arraydata)

  const handleAddItem = () => {
    setArray([...array, { name: '', quantity: 0, price: 0 }])
  }

  console.log('array', array)
  return (
    <CsWrapperForm>
      <CsContainer>
        {
          array.map((_, index) => (
            <Card index={index} formState={formState} setValue={setValue} control={control} />
          ))
        }
      </CsContainer>

      <CsSubTotal>
        <CsButtonAdd onClick={handleAddItem}>
          <CsAddIcon />
          <CsText>Line item</CsText>
        </CsButtonAdd>
        <hr style={{margin: '10px 0'}} />
        <Row mt="16px" style={{justifyContent: "space-between"}}>
            <CsTextLeft>Amount Due</CsTextLeft>
            <CsTextRight bold>100.00 Pi</CsTextRight>
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

const CsButtonAdd = styled(Button)`
  margin-top: 12px;
  margin-bottom: 12px;
  border-bottom: 1px solid #E2E8F0;
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