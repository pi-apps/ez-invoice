import React from 'react'
import { Box } from '@devfedeltalabs/pibridge_uikit'



const Container: React.FC<any> = ({ children, ...props }) => (
  <Box px={['16px', '0px']} mx="auto" maxWidth="1380px"  {...props}>
    {children}
  </Box>
)

export default Container
