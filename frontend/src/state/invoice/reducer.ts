import { createReducer } from "@reduxjs/toolkit"
import { tabActive, tabActiveNewInvoice, getAnInvoice, fetchLoading, fetchFailure, getAllInvoiceSent, getAllInvoiceReceived, getAllInvoiceAll } from "./actions"
import { ItemsDetails, ListSent, ListSentItems } from "./types"

interface globalStateInvoice {
    isSent:boolean
    isActive:number
    allInvoice:any,
    details:ItemsDetails,
    isLoading:boolean,
    isFailure:boolean,
    listSent: ListSentItems[],
    listReceived: ListSentItems[]
}

export const initialState: globalStateInvoice = {
    isSent:true,
    isActive: 1,
    allInvoice: null,
    details: null,
    isLoading:false,
    isFailure:false,
    listSent: null,
    listReceived: null
}

export default createReducer(initialState, (builder) =>
   builder
    .addCase(tabActive, (state, action) => {
      state.isSent = action.payload.isSent
    })
    .addCase(tabActiveNewInvoice, (state, action) => {
        state.isActive = action.payload.isActive
    })
    .addCase(getAnInvoice, (state, action) => {
        state.details = action.payload.details
    })  
    .addCase(fetchLoading, (state, action) => {
        state.isLoading = action.payload.isLoading
    })
    .addCase(fetchFailure, (state, action) => {
        state.isFailure = action.payload.isFailure
    })
    .addCase(getAllInvoiceSent, (state, action) => {
        state.listSent = action.payload.listSent
    })
    .addCase(getAllInvoiceReceived, (state, action) => {
        state.listReceived = action.payload.listReceived
    })
    .addCase(getAllInvoiceAll, (state, action) => {
        state.allInvoice = action.payload.allInvoice
    })
)
