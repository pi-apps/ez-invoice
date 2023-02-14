import { createReducer } from "@reduxjs/toolkit"
import { allInvoice, tabActive, tabActiveNewInvoice, getAnInvoice, fetchLoading, fetchFailure, getAllInvoiceSent } from "./actions"
import { ItemsDetails, ListSent, ListSentItems } from "./types"

interface globalStateInvoice {
    isSent:boolean
    isActive:number
    invoice_all:{},
    details:ItemsDetails,
    isLoading:boolean,
    isFailure:boolean,
    listSent: ListSentItems[]
}

export const initialState: globalStateInvoice = {
    isSent:true,
    isActive: 1,
    invoice_all: {
        senderEmail: '',
        billFrom:'',
        billTo:'',
        shipTo: '',
        issueDate: '',
        dueDate: '',
        paymentTerms:'',
        poNumber:'',
        items: '',
        notes:'',
        terms:'',
        tax:'',
        taxType:'',
        discount:'',
        shipping:'',
        amountPaid:'',
        logo: null,
    },
    details: null,
    isLoading:false,
    isFailure:false,
    listSent: null
}

export default createReducer(initialState, (builder) =>
   builder
    .addCase(tabActive, (state, action) => {
      state.isSent = action.payload.isSent
    })
    .addCase(tabActiveNewInvoice, (state, action) => {
        state.isActive = action.payload.isActive
    })
    .addCase(allInvoice, (state, action) => {
        state.invoice_all = action.payload.invoice_all
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
)
