import { NavLink, useLocation } from 'react-router-dom'
import styled from 'styled-components'



const StyledNav = styled.nav`
  margin-bottom: 0px;
  justify-content: center;
  text-align: center;
  display: flex;
  overflow: hidden;
  flex-direction: row;
  width: 100%;
  box-sizing: border-box;
  padding: 2px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    padding: 2px;
    width: 550px;
  }
  a {
    flex-grow: 1;
    padding-top: 12px;
    padding-bottom: 12px;
    
    color: ${({ theme }) => theme.colors.text};
    font-weight: bold;
    font-size: 18px;
    line-height: 16px;
    text-align: center;
    height: 50px;
    display: inline-block;
  }
`
const Wrapper = styled.div`
  width:100%;
  height:auto;
  background:${({ theme }) => theme.colors.background};
`
const defaultStyle = {
 
}
const styleActive = { 
    
  color: '#49A2F2', 
  borderBottom: '5px solid #49A2F2',
  boxsizing: 'border-box',
}



const getActiveIndex = (pathname: string): number => {
  let pathActive = 0
  switch (pathname) {
    case '/swap':
      pathActive = 0
      break;
    default:
      pathActive = 1
      break;
  }
  return pathActive
}

const Nav = () => {
  const location = useLocation()
  const activeIndex = getActiveIndex(location.pathname)
  
  return (
    <Wrapper>
        <StyledNav>
          <NavLink style={activeIndex === 0 ? styleActive : defaultStyle} to="/swap" aria-hidden="true">
            <strong>Swap</strong>
          </NavLink>
          <NavLink style={activeIndex === 1 ? styleActive : defaultStyle} to="/pool" aria-hidden="true">
            <strong>Liquidity</strong>
          </NavLink>
        </StyledNav>
    </Wrapper>
    
  )
}

export default Nav
