import { createReducer } from "@reduxjs/toolkit";
import { setInvoiceIdRedux } from "./actions";

interface globalStateGoogle {
  invoiceId: any;
}

export const initialState: globalStateGoogle = {
  invoiceId: '',

};

export default createReducer(initialState, (builder) =>
  builder.addCase(setInvoiceIdRedux, (state, action) => {
    state.invoiceId = action.payload;
  })
);
