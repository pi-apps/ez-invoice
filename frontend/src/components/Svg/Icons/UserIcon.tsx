import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path fill="none" d="M9.35 9.34502C10.3731 9.34502 11.2025 8.51562 11.2025 7.49252C11.2025 6.46941 10.3731 5.64001 9.35 5.64001C8.32689 5.64001 7.4975 6.46941 7.4975 7.49252C7.4975 8.51562 8.32689 9.34502 9.35 9.34502Z" stroke="#6B39F4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path fill="none" d="M5.61501 14.4676V13.4101C5.61501 12.1801 6.6125 11.1901 7.835 11.1901H11.1575C12.3875 11.1901 13.3775 12.1876 13.3775 13.4101V14.4676" stroke="#6B39F4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path fill="none" d="M9.5 15.9375C13.3315 15.9375 16.4375 12.8315 16.4375 9C16.4375 5.16852 13.3315 2.0625 9.5 2.0625C5.66852 2.0625 2.5625 5.16852 2.5625 9C2.5625 12.8315 5.66852 15.9375 9.5 15.9375Z" stroke="#6B39F4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  )
}

export default Icon
