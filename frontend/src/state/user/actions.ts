import { createAction } from '@reduxjs/toolkit'
import { UserType } from "./types"

export const setUser = createAction<UserType>('user')
export const getAccessToken = createAction<{accessToken:string}>('user/getAccessToken')