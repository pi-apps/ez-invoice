import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg width="57" height="56" viewBox="0 0 57 56" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect x="0.5" width="56" height="56" rx="28" fill="#F8F5FF"/>
        <path d="M31 33.6H24.9" stroke="#6B39F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M31.1 30.6H24.9" stroke="#6B39F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M33.1 24H33.8" stroke="#6B39F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path fill="none" d="M33.1 24H34.4C36 24 37.3 25.4 37.3 27.1V34.2C37.3 35.9 36 37.3 34.4 37.3H21.6C20 37.3 18.7 35.9 18.7 34.2V27.1C18.8 25.4 20 24 21.6 24H23.1" stroke="#6B39F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M28 27.3V18.8" stroke="#6B39F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M28 18.8L25.1 21.7" stroke="#6B39F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M28 18.8L30.9 21.7" stroke="#6B39F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  )
}

export default Icon
