import { createAction } from "@reduxjs/toolkit";

export const setLanguageTransRedux = createAction<string | undefined>("languageTrans");
