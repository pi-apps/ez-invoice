import { createReducer } from "@reduxjs/toolkit"
import { setUser } from "./actions"
import { UserType } from "./types"

interface globalStateUser {
    user: UserType
}

export const initialState: globalStateUser = {
    user: null
}

export default createReducer(initialState, (builder) => 
   builder
    .addCase(setUser, (state, action) => {
      state.user = action.payload
    })
)    