import React, { lazy } from 'react'
import { Router, Redirect, Route, Switch } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import Shop from "./Shop/index"
import ResetCSS  from './style/ResetCSS'
import GlobalStyle from './style/Global'
import Menu, { IsOpenProvider } from './components/Menu'
import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import { ToastListener } from './contexts/ToastsContext'
import PageLoader from './components/Loader/PageLoader'
import history from './routerHistory'


// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page
// This config is required for number formatting Membership   
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  return (
    <Router history={history}>
      <ResetCSS />
      <GlobalStyle />
      <IsOpenProvider>
        <Menu>
            <Switch>
              <Route path="/" exact>
                  <Shop />
              </Route>          
              <Route component={Shop}/>
            </Switch>
        </Menu>
      </IsOpenProvider>
      <ToastListener />
    </Router>
    
  )
}

export default React.memo(App)
