import BigNumber from 'bignumber.js'
import { createBrowserHistory } from 'history'
import React, { Fragment } from 'react'
import { Route, Routes } from "react-router-dom"
import Home from 'views/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import MainLayout from './components/Layout/mainLayout'
import CreateInvoices from 'views/CreateInvoices'
import DetailSent from 'views/Invoices/SentTabContent/DetailSent'
import DetailReceived from 'views/Invoices/ReceiveContent/DetailReceived'
import { ToastListener } from './contexts/ToastsContext'
import Register from 'views/Register'
import Invoices from 'views/Invoices'
import CreateDetail from 'views/CreateInvoices/components/CreateDetail'

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page
// This config is required for number formatting Membership   
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  return (
    <Fragment>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home/>} />
            <Route path="register" element={ <Register/> } />
            <Route path="account" element={ <Register/> } />
          </Route>
          <Route path="invoice" element={ <Invoices/> } />
          <Route path="newInvoice" element={ <CreateInvoices/> } /> 
          <Route path="detailSent/:slug" element={ <DetailSent /> } /> 
          <Route path="detailReceived/:slug" element={ <DetailReceived /> } /> 
          <Route path="createDetail/:slug" element={ <CreateDetail /> } /> 
        </Routes>
        <ToastListener/>
    </Fragment>
  )
}

export default React.memo(App)