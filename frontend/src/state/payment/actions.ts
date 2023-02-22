import { createAction } from '@reduxjs/toolkit'
import { DetailsInvoice, UserType } from './type'

export const getInvoiceId = createAction<{invoiceId:string}>('payment/getInvoiceId')
export const fetchDataUser = createAction<UserType>('payment/fetchDataUser')
export const isFetching = createAction<{isFetching:boolean}>('payment/isFetching')
export const isFetchError = createAction<{isError:boolean}>('payment/isFetchError')
export const getAnInvoice = createAction<DetailsInvoice>('payment/getAnInvoice')