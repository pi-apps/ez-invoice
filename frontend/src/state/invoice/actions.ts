import { createAction } from '@reduxjs/toolkit'
import { tabActiveType } from "./types"

export const tabActive = createAction<tabActiveType>('invoice/tabActive')