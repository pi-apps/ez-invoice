import { createReducer } from "@reduxjs/toolkit"
import { getHistory, fetchLoadingHistory } from "./actions"
import { ItemsDetails } from "./type"

interface globalStateHistory {
    isLoading:boolean,
    listItems: ItemsDetails[]   
}

export const initialState: globalStateHistory = {
    isLoading:false,
    listItems: null 
}

export default createReducer(initialState, (builder) =>
   builder
    .addCase(fetchLoadingHistory, (state, action) => {
      state.isLoading = action.payload.isLoading
    })
     .addCase(getHistory, (state, action) => {
      state.listItems = action.payload.listItems
    })
)
