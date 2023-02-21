import { createAction } from '@reduxjs/toolkit'
import { ListHistory } from "./type"

export const getHistory = createAction<ListHistory>('history/getHistory')
export const fetchLoadingHistory = createAction<{isLoading:boolean}>('history/fetchLoadingHistory')
