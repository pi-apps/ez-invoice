import { createReducer } from "@reduxjs/toolkit"
import { getHistory, fetchLoadingHistory, getImageFileHistory, fectchChangeImgHistory } from "./actions"
import { ItemsDetails } from "./type"

interface globalStateHistory {
    isLoading:boolean,
    listItems: ItemsDetails[],
    imageFile: any,
    isChangeImgHistory: boolean
}

export const initialState: globalStateHistory = {
    isLoading:false,
    listItems: null,
    imageFile: null,
    isChangeImgHistory:false
}

export default createReducer(initialState, (builder) =>
   builder
    .addCase(fetchLoadingHistory, (state, action) => {
      state.isLoading = action.payload.isLoading
    })
    .addCase(getHistory, (state, action) => {
      state.listItems = action.payload.listItems
    })
    .addCase(getImageFileHistory, (state, action) => {
      state.imageFile = action.payload.imageFile
    })
    .addCase(fectchChangeImgHistory, (state, action) => {
      state.isChangeImgHistory = action.payload.isChangeImgHistory
    })
)
