import { createAction } from '@reduxjs/toolkit'
import { tabActiveType,tabActiveNewInvoiceType, allInvoiceType, DetailsInvoice, ListSent } from "./types"

export const tabActive = createAction<tabActiveType>('invoice/tabActive')
export const tabActiveNewInvoice = createAction<tabActiveNewInvoiceType>('invoice/tabActiveNewInvoice')
export const allInvoice = createAction<allInvoiceType>('invoice/allInvoice')

export const getAnInvoice = createAction<DetailsInvoice>('details/getAnInvoice')
export const fetchLoading = createAction<{isLoading:boolean}>('details/fetchLoading')
export const fetchFailure = createAction<{isFailure:boolean}>('details/fetchFailure')
export const getAllInvoiceSent = createAction<ListSent>('details/getAllInvoiceSent')