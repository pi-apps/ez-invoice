import { createReducer } from "@reduxjs/toolkit"
import { setUser, accessToken } from "./actions"
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
    .addCase(accessToken, (state, action) => {
        state.accessToken = action.payload.accessToken
    })
)    