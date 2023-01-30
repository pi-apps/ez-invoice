import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path fill='none' d="M3.32001 13.5825V10.59C3.32001 9.28497 4.37751 8.21997 5.69001 8.21997H13.3175C14.6225 8.21997 15.6875 9.27747 15.6875 10.59V13.5825C15.6875 14.8875 14.63 15.9525 13.3175 15.9525H5.69001C4.37751 15.9525 3.32001 14.895 3.32001 13.5825Z" stroke="#6B39F4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path fill='none' d="M5.6375 8.22752V5.94002C5.6375 3.81002 7.37 2.07751 9.5 2.07751C11.63 2.07751 13.3625 3.81002 13.3625 5.94002V8.22752H5.6375Z" stroke="#6B39F4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9.5 13.635V11.7" stroke="#6B39F4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9.5 12.09C9.92664 12.09 10.2725 11.7442 10.2725 11.3175C10.2725 10.8909 9.92664 10.545 9.5 10.545C9.07336 10.545 8.7275 10.8909 8.7275 11.3175C8.7275 11.7442 9.07336 12.09 9.5 12.09Z" fill="#6B39F4" stroke="#6B39F4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  )
}

export default Icon
