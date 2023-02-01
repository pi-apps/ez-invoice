import { createReducer } from "@reduxjs/toolkit"
import { tabActive } from "./actions"

interface globalStateInvoice {
    isSent:boolean
}

export const initialState: globalStateInvoice = {
    isSent:true
}

export default createReducer(initialState, (builder) => 
   builder
    .addCase(tabActive, (state, action) => {
      state.isSent = action.payload.isSent
    })
)    