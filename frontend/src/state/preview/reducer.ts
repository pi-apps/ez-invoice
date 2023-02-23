import { createReducer } from "@reduxjs/toolkit"
import { getDataPreview, getDataImages, fetchStatusPreview } from "./actions"
import { ItemsPreview } from "./type"

interface globalStateInvoice {
    dataPreview:ItemsPreview,
    images: any,
    isPreview: boolean
}

export const initialState: globalStateInvoice = {
    dataPreview:null,
    images: null,
    isPreview: false
}

export default createReducer(initialState, (builder) =>
   builder
    .addCase(getDataPreview, (state, action) => {
      state.dataPreview = action.payload.dataPreview
    })
    .addCase(getDataImages, (state, action) => {
        state.images = action.payload.images
    })
    .addCase(fetchStatusPreview, (state, action) => {
        state.isPreview = action.payload.isPreview
    })
)
