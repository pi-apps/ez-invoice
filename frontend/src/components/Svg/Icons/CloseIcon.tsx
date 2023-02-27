import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'


const CloseIcon: React.FC = (props) => {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 1L1 10.135" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M1 1L10 10.135" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  )
}

export default CloseIcon