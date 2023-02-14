import { createAction } from '@reduxjs/toolkit'
import { tabActiveType,tabActiveNewInvoiceType, allInvoiceType } from "./types"

export const tabActive = createAction<tabActiveType>('invoice/tabActive')
export const tabActiveNewInvoice = createAction<tabActiveNewInvoiceType>('invoice/tabActiveNewInvoice')
export const allInvoice = createAction<allInvoiceType>('invoice/allInvoice')