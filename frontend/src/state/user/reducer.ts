import { createReducer } from "@reduxjs/toolkit"
import { setUser, accessToken, isLoading } from "./actions"
import { UserType } from "./types"

interface globalStateUser {
    userInfor: UserType | null
    accessToken:string
    isLoading:boolean
}

export const initialState: globalStateUser = {
    userInfor: null,
    accessToken:"",
    isLoading:false
}

export default createReducer(initialState, (builder) => 
   builder
    .addCase(setUser, (state, action) => {
      state.userInfor = action.payload
    })
    .addCase(accessToken, (state, action) => {
        state.accessToken = action.payload.accessToken
    })
    .addCase(isLoading, (state, action) => {
        state.isLoading = action.payload.isLoading
    })
)    