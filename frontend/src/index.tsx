import React, { useMemo, ReactNode } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Providers from './Providers'
import { BrowserRouter } from "react-router-dom";
import ResetCSS from './style/ResetCSS'
import GlobalStyle from './style/Global'
import Menu, { IsOpenProvider } from './components/Menu'
import Header from './components/Header';

ReactDOM.render(
  <React.StrictMode>
      <Providers>
          <BrowserRouter>
            <ResetCSS />
            <GlobalStyle />
            <IsOpenProvider>
              <App />
            </IsOpenProvider>
          </BrowserRouter>
      </Providers>
  </React.StrictMode>,
  document.getElementById('root'),
)
