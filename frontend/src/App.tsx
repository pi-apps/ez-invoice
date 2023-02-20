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
import Invoices from "views/Invoices";
import History from "views/History";
import CreateDetail from "views/CreateInvoices/components/CreateDetail";
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

  const DataAb = getUser();
  const { language } = useContext(LanguagesContext);
  const languageTransRedux = getLanguageTrans();

  return (
    <Fragment>
      <Translator
        from="en"
        to={
          language !== null
            ? language
            : languageTransRedux ? languageTransRedux
            : DataAb?.language
            ? DataAb?.language
            : "en"
        }
        googleApiKey={APIKEY_GOOGLE}
      >
         <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="invoice" element={<Invoices />} />
          <Route path="newInvoice" element={<CreateInvoices />} />
          <Route path="detailSent/:slug" element={<DetailSent />} />
          <Route path="detailReceived/:slug" element={<DetailReceived />} />
          <Route path="createDetail/:slug" element={<CreateDetail />} />
          <Route path="send/:invoiceId" element={<SendInvoice />} />
          <Route path="history" element={<History />} />
        </Routes>
        <ToastListener />
      </Translator>
    </Fragment>
  );
};

export default React.memo(App);
