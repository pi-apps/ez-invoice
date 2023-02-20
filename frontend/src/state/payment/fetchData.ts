
import { InvoiceId, UserType } from "./type"
import { axiosClient } from "config/htttp"
import { DetailsInvoice } from "./type"

export const fetchInvoiceId = async (signature:string): Promise<InvoiceId> => {
    console.log("signature", signature)
    try {
        const submitReq = await axiosClient.get(`payments/get-invoice-id/${signature}`);
        console.log("submitReq", submitReq)
        return {
            invoiceId: submitReq?.data
        } 
    } catch (e) {
        console.log(e)
        return {
            invoiceId: ""
        } 
    }
}

export const fetchAnInvoice = async (invoiceId:string): Promise<DetailsInvoice> => {
    try {
        const submitReq = await axiosClient.get(`invoice/detail/${invoiceId}`);
        return {
            details: submitReq?.data
        } 
    } catch (e) {
        console.log(e)
        return {
            details: null
        } 
    }
}

export const fetchUser = async (): Promise<UserType> => {
    try {
        const userInfor = await axiosClient.get("user/info");
        return {
            userData: userInfor?.data
        } 
    } catch (e) {
        console.log(e)
        return {
            userData: null
        } 
    }
}