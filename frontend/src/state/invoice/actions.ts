import { createAction } from '@reduxjs/toolkit'
import { tabActiveType,tabActiveNewInvoiceType, DetailsInvoice, ListSent, ListReceived, AllInvoice } from "./types"

export const tabActive = createAction<tabActiveType>('invoice/tabActive')
export const tabActiveNewInvoice = createAction<tabActiveNewInvoiceType>('invoice/tabActiveNewInvoice')

export const getAnInvoice = createAction<DetailsInvoice>('details/getAnInvoice')
export const fetchLoading = createAction<{isLoading:boolean}>('details/fetchLoading')
export const fetchFailure = createAction<{isFailure:boolean}>('details/fetchFailure')
export const getAllInvoiceAll = createAction<AllInvoice>('invoice/getAllInvoiceAll')
export const getAllInvoiceSent = createAction<ListSent>('details/getAllInvoiceSent')
export const getAllInvoiceReceived = createAction<ListReceived>('details/getAllInvoiceReceived')