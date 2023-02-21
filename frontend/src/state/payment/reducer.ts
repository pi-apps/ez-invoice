import { createReducer } from "@reduxjs/toolkit"
import { getInvoiceId, isFetching, isFetchError, getAnInvoice, fetchDataUser } from "./actions"
import { ItemsDetails, UserType } from "./type"

interface globalStateInvoice {
    invoiceId:string,
    isFetching:boolean,
    isError:boolean
    details: ItemsDetails,
    userData: {
        uid: string;
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        roles: Array<string>;
        language: string;
        accessToken: string;
   }
}

export const initialState: globalStateInvoice = {
    invoiceId:"",
    isFetching:false,
    isError:false,
    details: null,
    userData: null
}

export default createReducer(initialState, (builder) =>
   builder
    .addCase(getInvoiceId, (state, action) => {
      state.invoiceId = action.payload.invoiceId
    })
    .addCase(isFetching, (state, action) => {
        state.isFetching = action.payload.isFetching
    })
    .addCase(isFetchError, (state, action) => {
        state.isError = action.payload.isError
    })
    .addCase(getAnInvoice, (state, action) => {
        state.details = action.payload.details
    })
    .addCase(fetchDataUser, (state, action) => {
        state.userData = action.payload.userData
    })
)
