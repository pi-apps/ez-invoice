import React from 'react'
import styled from 'styled-components'
import MetaTags from 'react-meta-tags'

const PageMeta = () => {
  return (
    <MetaTags>
     <title>EZ Invoice</title>
      <meta property="og:title" content="EZ Invoice" />
      <meta property="og:description" content="The easiest way to do invoicing" />
      <meta property="og:image" content="https://ipfs.moralis.io:2053/ipfs/QmYQ19pa3dWr3JSFbSVTPRTVBXEdiKcTpMTMCRNrjvn1NW/73ddc551ac93fba3dcee8bb3483dcd54" />
    </MetaTags>
  )
}

const PageFullWidth: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return (
        <Wrapper>
            <PageMeta />
            {children}
        </Wrapper>
  )
}

export default PageFullWidth

const Wrapper = styled.div`
    width:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction: column;
    margin-bottom: 100px;
`