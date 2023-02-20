import { createReducer } from "@reduxjs/toolkit"
import { setUser, getAccessToken } from "./actions"
import { UserType } from "./types"

interface globalStateUser {
    userInfor: UserType | null
    accessToken:string
}

export const initialState: globalStateUser = {
    userInfor: null,
    accessToken:""
}

export default createReducer(initialState, (builder) => 
   builder
    .addCase(setUser, (state, action) => {
      state.userInfor = action.payload
    })
    .addCase(getAccessToken, (state, action) => {
        state.accessToken = action.payload.accessToken
    })
)    