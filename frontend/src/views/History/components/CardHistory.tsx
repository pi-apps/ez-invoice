import { CloseIcon, Flex, Image, Skeleton, Text } from '@devfedeltalabs/pibridge_uikit'
import React from 'react'
import { UndefineIcon } from 'components/Svg';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components'
import { Translate } from "react-auto-translate";
import { ItemsDetails } from "state/history/type"

interface Props {
  items: ItemsDetails
  loading:boolean
}
const CardHistory: React.FC<Props> = ({ items, loading }) => {

  function convertDate(date: any) {
    if (date) {
      const today = new Date(date)
      const dd = String(today.getDate()).padStart(2, '0')
      const mm = String(today.getMonth() + 1).padStart(2, '0')
      const yyyy = today.getFullYear()
      return (
        <Text fontSize='12px' color='#64748B'>
            {dd}/{mm}/{yyyy}
        </Text>
      )
    }
    return null
  }

  return (
    <WrapperCard>
      <NavLink to={`/updateinvoice/${items?.invoiceId}`}>
        <CsWrapCard>
          <Flex style={{gap: '14px'}} alignItems="center">
            <WrapperImg>
              { items?.logoUrl ?
                <CsImg src={items?.logoUrl} alt="Get some help"/>
                :
                <UndefineIcon width="30px" height="30px"/>
              }
            </WrapperImg>
            <Flex flexDirection='column'>
                { loading ?
                  <Skeleton width="60px"/>
                :
                  <Text style={{wordBreak: 'break-all'}} fontWeight={700} fontSize='12px' color='#0F172A'>        
                    {items?.billTo}      
                  </Text>
                }
              
              {convertDate(items?.createAt)}
            </Flex>
          </Flex>
          <CsButtonDelete role="presentation">
            <Text style={{wordBreak: 'break-all'}} fontWeight={700} fontSize='12px' color='#0F172A' width="100%" textAlign="center">
              { Number(items?.amountDue) > 0 ? Number(items?.amountDue).toLocaleString('en', { minimumFractionDigits: 4, maximumFractionDigits: 4 }) : 0} PI
            </Text>
          </CsButtonDelete>
        </CsWrapCard>
      </NavLink>
      
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
const WrapperImg = styled.div`
  width: 30px;
  height: 30px;
`

const WrapperCard = styled.div`
  background: #FFFFFF;
  width: 100%;
  height: 100%;
  max-width: 48%;
`
const CsWrapCard = styled.div`
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  padding: 15px 12px;
  
`
export default CardHistory