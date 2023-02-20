import { createAction } from "@reduxjs/toolkit";

export const setInvoiceIdRedux = createAction<string | undefined>("invoiceId");
