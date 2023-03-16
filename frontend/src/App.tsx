import BigNumber from "bignumber.js";
import { createBrowserHistory } from "history";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "views/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import MainLayout from "./components/Layout/mainLayout";
import CreateInvoices from "views/CreateInvoices";
import DetailSent from "views/Invoices/SentTabContent/DetailSent";
import { Translator } from "react-auto-translate";
import DetailReceived from "views/Invoices/ReceiveContent/DetailReceived";
import Payment from "views/Payment/index"
import { ToastListener } from "./contexts/ToastsContext";
import Register from "views/Register";
import UpdateInvoice from "views/UpdateInvoice"
import Invoices from "views/Invoices";
import Policy from "views/Policy"
import History from "views/History";
import CreateDetail from "views/CreateInvoices/components/CreateDetail";
import Preview from "views/Preview";
import { getUser } from "./state/user";
import SendInvoice from "views/SendInvoice";
import { LanguagesContext } from "contexts/Translate";
import { getLanguageTrans } from "state/LanguageTrans";

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page
// This config is required for number formatting Membership
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});



const APIKEY_GOOGLE = process.env.REACT_APP_APIKEY_GOOGLE

const App: React.FC = () => { 
  const { language } = useContext(LanguagesContext);
  const [languageState, setLanguageState] = useState(null)
  const DataAb = getUser();
  const languageUserApi = DataAb?.language

  useEffect(() => {
    if (!languageUserApi || languageUserApi === 'en')     
    setLanguageState(languageUserApi)
  }, [languageUserApi]);

  return (
    <Fragment>
         <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="/policy" element={<Policy />} />
          <Route path="invoice" element={<Invoices />} />
          <Route path="newInvoice" element={<CreateInvoices />} />
          <Route path="detailSent/:slug" element={<DetailSent />} />
          <Route path="detailReceived/:slug" element={<DetailReceived />} />
          <Route path="createDetail/:slug" element={<CreateDetail />} />
          <Route path="updateinvoice/:invoiceId" element={<UpdateInvoice />} />
          <Route path="payment/:signature" element={<Payment />} />
          <Route path="send/:slug" element={<SendInvoice />} />
          <Route path="history" element={<History/>} />
          <Route path="preview" element={<Preview/>} />
        </Routes>
        <ToastListener />
    </Fragment>
  );
};

export default React.memo(App);
