import { createAction } from "@reduxjs/toolkit";
// import { AccessTokenType } from "./types";

export const setInvoiceIdRedux = createAction<string | undefined>("invoiceId");
