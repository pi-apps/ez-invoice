import React from "react";
import { ModalProvider, light, dark } from "@devfedeltalabs/pibridge_uikit";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { ToastsProvider } from "./contexts/ToastsContext";
import { RefreshContextProvider } from "./contexts/RefreshContext";
import store from "./state";

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
