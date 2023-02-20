import { createAction } from '@reduxjs/toolkit'
import { UserType } from "./types"

export const setUser = createAction<UserType>('user')
export const accessToken = createAction<{accessToken:string}>('user/getAccessToken')