import { createReducer } from "@reduxjs/toolkit"
import { getDataPreview, getDataImages } from "./actions"
import { ItemsPreview } from "./type"

interface globalStateInvoice {
    dataPreview:ItemsPreview,
    images: any
}

export const initialState: globalStateInvoice = {
    dataPreview:null,
    images: null
}

export default createReducer(initialState, (builder) =>
   builder
    .addCase(getDataPreview, (state, action) => {
      state.dataPreview = action.payload.dataPreview
    })
    .addCase(getDataImages, (state, action) => {
        state.images = action.payload.images
    })
)
