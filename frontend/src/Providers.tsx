import React, { useContext } from "react";
import { ModalProvider, light, dark } from "@phamphu19498/pibridge_uikit";
import { Translator } from "react-auto-translate";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { ToastsProvider } from "./contexts/ToastsContext";
import { RefreshContextProvider } from "./contexts/RefreshContext";
import { LanguagesContext } from "contexts/Translate";
import store from "./state";
import { getUser } from "state/user";

const Providers: React.FC = ({ children }) => {
  return (
    <Provider store={store}>
      <ToastsProvider>
        <ThemeProvider theme={light}>
          <RefreshContextProvider>
            <ModalProvider>{children}</ModalProvider>
          </RefreshContextProvider>
        </ThemeProvider>
      </ToastsProvider>
    </Provider>
  );
};

export default Providers;
