import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.5 8.99829C16.5 13.1383 13.14 16.4983 8.99997 16.4983C4.85997 16.4983 2.33247 12.3283 2.33247 12.3283M2.33247 12.3283H5.72247M2.33247 12.3283V16.0783M1.49997 8.99829C1.49997 4.85829 4.82997 1.49829 8.99997 1.49829C14.0025 1.49829 16.5 5.66829 16.5 5.66829M16.5 5.66829V1.91829M16.5 5.66829H13.17" stroke="#6B39F4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  )
}

export default Icon
