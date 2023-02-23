import React from 'react'
import styled from 'styled-components'
import MetaTags from 'react-meta-tags'

const PageMeta = () => {
  return (
    <MetaTags>
     <title>EZ Invoice</title>
      <meta property="og:title" content="EZ Invoice" />
      <meta property="og:description" content="EZ Invoice" />
      <meta property="og:image" content="https://pibridge.org/wp-content/uploads/2022/09/Preview.png" />
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