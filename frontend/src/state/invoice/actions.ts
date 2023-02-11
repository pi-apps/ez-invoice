import { createAction } from '@reduxjs/toolkit'
import { tabActiveType,tabActiveNewInvoiceType } from "./types"

export const tabActive = createAction<tabActiveType>('invoice/tabActive')
export const tabActiveNewInvoice = createAction<tabActiveNewInvoiceType>('invoice/tabActiveNewInvoice')