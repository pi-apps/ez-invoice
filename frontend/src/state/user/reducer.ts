import { createReducer } from "@reduxjs/toolkit"
import { setUser } from "./actions"
import { UserType } from "./types"

interface globalStateUser {
    userInfor: UserType | null
}

export const initialState: globalStateUser = {
    userInfor: null
}

export default createReducer(initialState, (builder) => 
   builder
    .addCase(setUser, (state, action) => {
      state.userInfor = action.payload
    })
)    