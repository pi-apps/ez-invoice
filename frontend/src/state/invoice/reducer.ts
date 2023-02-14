import { createReducer } from "@reduxjs/toolkit"
import { allInvoice, tabActive, tabActiveNewInvoice } from "./actions"
interface globalStateInvoice {
    isSent:boolean
    isActive:number
    invoice_all:{}
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
)
