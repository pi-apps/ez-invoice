import { CloseIcon, Flex, Image, Text } from '@devfedeltalabs/pibridge_uikit'
import React from 'react'
import styled from 'styled-components'
import { Translate } from "react-auto-translate";

const CardHistory = ({handleDeleteItem, item}) => {
console.log('item', item)
  return (
    <WrapperCard>
      <CsWrapCard>
        <Flex style={{gap: '14px'}} alignItems="center">
          <WrapperImg>
            <CsImg src="/images/imgPi/logoPi.png" alt="Get some help" width={160} height={108} />
          </WrapperImg>
          <Flex flexDirection='column'>
            <Text fontWeight={700} fontSize='12px' color='#0F172A'><Translate>{item?.name}</Translate></Text>
            <Text fontSize='10px' color='#64748B'><Translate>Jan 13, 2023</Translate></Text>
          </Flex>
        </Flex>
        <CsButtonDelete role="presentation">
          <Text fontWeight={700} fontSize='12px' color='#0F172A'>{item?.price} Pi</Text>
          <Flex onClick={() => handleDeleteItem(item.id)} alignItems='center'><CloseIcon transform='translateY(1px)' width='12px' color='#CE1D1D'/><Text fontWeight={700} fontSize='8px' color='#CE1D1D'><Translate>Delete</Translate></Text></Flex>
        </CsButtonDelete>
      </CsWrapCard>
    </WrapperCard>
  )
}
const CsButtonDelete = styled(Flex)`
  cursor: pointer;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
`

const CsImg = styled.img`
  width: 30px;
  height: 30px;
  object-fit: contain;
`
const WrapperImg = styled.div``

const WrapperCard = styled.div`
  background: #FFFFFF;
  width: 100%;
  max-width: 48%;
`
const CsWrapCard = styled.div`
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  padding: 15px 12px;
  
`
export default CardHistory