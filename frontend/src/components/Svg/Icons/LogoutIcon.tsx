import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg width="57" height="56" viewBox="0 0 57 56" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect x="0.5" width="56" height="56" rx="28" fill="#F8F5FF"/>
        <path fill="none" d="M33.25 33.14V34.4C33.25 35.98 31.85 37.25 30.12 37.25H22.87C21.14 37.25 19.74 35.97 19.74 34.4V21.6C19.74 20.02 21.14 18.75 22.87 18.75H30.12C31.85 18.75 33.25 20.03 33.25 21.6V22.86" stroke="#6B39F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M28.28 28H38.23" stroke="#6B39F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M38.25 28L34.97 24.74" stroke="#6B39F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M38.25 28L34.97 31.26" stroke="#6B39F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  )
}

export default Icon
