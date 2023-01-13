import React from 'react'
import styled, { css } from 'styled-components'
import { useLocation } from 'react-router'
import { Helmet } from 'react-helmet-async'
import Container from './Container'



const ContainerPage = styled(Container) `
  
  min-height: calc(100vh - 64px);
  // padding: 16px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  width:1380px;
  @media only screen and (max-width: 600px) {
    padding:0px;
  }
`

const StyledPage = styled(Container)`
  ${({ theme }) => theme.mediaQueries.sm} {
    padding-bottom: 24px;
    padding-left: 0px;
    padding-right: 0px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-bottom: 32px;
    // padding-left: 30px;
    // padding-right: 30px;
  }
  max-width: none;
`
const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    width:100%;
    background: url("/images/MaskBG.svg") ${({ theme }) =>theme.isDark ? "#FFF8E7" : "#FFFFFF"};
`

const PageMeta = () => {
  const { pathname } = useLocation()
  const cakePriceUsdDisplay = ''


  return (
    <Helmet>
      <title>PiBridge - Together we build Pi’s world</title>
      <meta property="og:title" content="PiBridge - Together we build Pi’s world" />
      <meta property="og:description" content="PiBridge is a trustless gateway that unleashes the barrier between Pi network and other blockchains." />
      <meta property="og:image" content="https://pibridge.org/wp-content/uploads/2022/09/Preview.png" />
    </Helmet>
  )
}

const Page: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  const isBackgroundImage = true
  return (
    <Wrapper>
      <PageMeta />
      <ContainerPage {...props} isBackgroundImage={isBackgroundImage}>
        <StyledPage {...props} isBackgroundImage={false} background="transparent">{children}</StyledPage>
      </ContainerPage>
    </Wrapper>
  )
}

export default Page
