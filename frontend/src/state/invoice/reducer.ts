import { createReducer } from "@reduxjs/toolkit"
import { tabActive, tabActiveNewInvoice } from "./actions"

interface globalStateInvoice {
    isSent:boolean
    isActive:number
}

export const initialState: globalStateInvoice = {
    isSent:true,
    isActive: 1
}

export default createReducer(initialState, (builder) =>
   builder
    .addCase(tabActive, (state, action) => {
      state.isSent = action.payload.isSent
    })
    .addCase(tabActiveNewInvoice, (state, action) => {
        state.isActive = action.payload.isActive
    })
)
