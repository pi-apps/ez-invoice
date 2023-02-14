import React, { useMemo, ReactNode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Providers from "./Providers";
import { BrowserRouter } from "react-router-dom";
import ResetCSS from "./style/ResetCSS";
import GlobalStyle from "./style/Global";
import Menu, { IsOpenProvider } from "./components/Menu";
import Header from "./components/Header";
import "./i18n";
import { LanguagesContextProvider } from "contexts/Translate";

ReactDOM.render(
  <React.StrictMode>
    <Providers>
      <BrowserRouter>
        <ResetCSS />
        <GlobalStyle />
        <IsOpenProvider>
          <LanguagesContextProvider>
            <App />
          </LanguagesContextProvider>
        </IsOpenProvider>
      </BrowserRouter>
    </Providers>
  </React.StrictMode>,
  document.getElementById("root")
);
