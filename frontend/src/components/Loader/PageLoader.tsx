import React, { useState } from 'react'
import styled from 'styled-components'
import { Player } from '@lottiefiles/react-lottie-player';
import Page from '../Layout/Page'



const Wrapper = styled(Page)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const PageLoader: React.FC = () => {
  return (
    <Wrapper>
           <Player
            autoplay={!false}
            loop={!false}
            controls={false}
            src="https://assets2.lottiefiles.com/packages/lf20_p8bfn5to.json"
            style={{ height: '370px', width: '370px' }}
          />
    </Wrapper>
  )
}

export default PageLoader
