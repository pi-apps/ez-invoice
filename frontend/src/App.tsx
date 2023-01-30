import BigNumber from 'bignumber.js'
import { createBrowserHistory } from 'history'
import React from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import Home from 'views/Home'
import Register from 'views/Register'
import Menu, { IsOpenProvider } from './components/Menu'
import { ToastListener } from './contexts/ToastsContext'
import Shop from "./Shop/index"
import GlobalStyle from './style/Global'
import ResetCSS from './style/ResetCSS'


// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page
// This config is required for number formatting Membership   
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})
const history = createBrowserHistory()

const App: React.FC = () => {
  return (
    <Router history={history}>
      <ResetCSS />
      <GlobalStyle />
      <IsOpenProvider>
        <Menu>
            <Switch>
              <Route path="/" exact>
                  <Home />
              </Route>     
              <Route path="/register" exact>
                  <Register />
              </Route>         
              <Route component={Home}/>
            </Switch>
        </Menu>
      </IsOpenProvider>
      <ToastListener />
    </Router>
    
  )
}

export default React.memo(App)