import { createReducer } from "@reduxjs/toolkit";
import { setLanguageTransRedux } from "./actions";

interface globalStateGoogle {
  languageTrans: any;
}

export const initialState: globalStateGoogle = {
  languageTrans: '',

};

export default createReducer(initialState, (builder) =>
  builder.addCase(setLanguageTransRedux, (state, action) => {
    state.languageTrans = action.payload;
  })
);
