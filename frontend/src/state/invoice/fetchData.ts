
import { DetailsInvoice } from "./types"
import { axiosClient } from "config/htttp"

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