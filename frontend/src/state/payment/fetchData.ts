
import { InvoiceId, UserType } from "./type"
import { axiosClient } from "config/htttp"
import { DetailsInvoice } from "./type"

export const fetchInvoiceId = async (signature:string, token:string): Promise<InvoiceId> => {
    console.log("signature", signature)
    try {
        const submitReq = await axiosClient.get(`payments/get-invoice-id/${signature}`, {
            headers: {
                'Authorization': token,
            }
        });
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

export const fetchAnInvoice = async (invoiceId:string, token:string): Promise<DetailsInvoice> => {
    try {
        const submitReq = await axiosClient.get(`invoice/detail/${invoiceId}`, {
            headers: {
                'Authorization': token,
            }
        });
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

export const fetchUser = async (token:string): Promise<UserType> => {
    try {
        const userInfor = await axiosClient.get("user/info", {
            headers: {
                'Authorization': token,
              }
        });
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