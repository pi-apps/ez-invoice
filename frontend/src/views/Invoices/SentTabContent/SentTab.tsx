import { Flex, Text } from '@phamphu19498/pibridge_uikit'
import React from 'react'
import styled from 'styled-components'
import Card from './Card'

const SentTab = ({dataInvoice}) => {
  console.log('dataInvoice', dataInvoice)
  return (
    <CsWrapContainer>
        {[1,2,3].map(() => {
          return(
            <CsContent>
              <CsText>
                20 October 2022
              </CsText>
                {
                [1,2,3].map((_, index) => {
                  return <Card index={index+1}/> 
                })
              }
            </CsContent>
          )
        }
        )}
    </CsWrapContainer>
  )
}
const CsWrapContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  overflow: scroll;
  padding: 0 16px;
  height: calc(100vh - 300px);
`
const CsContent = styled(Flex)`
  margin-top: 14px;
  flex-direction: column;
`
const CsText = styled(Text)`
  font-weight: 500;
  font-size: 14px;
  color: #64748B;
`
export default SentTab