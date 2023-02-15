
import { DetailsInvoice, ListReceived, ListSent, AllInvoice} from "./types"
import { axiosClient } from "config/htttp"
import _ from 'lodash'

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

export const fetchAllInvoiceSent = async (): Promise<ListSent> => {
    try {
        const submitReq = await axiosClient.get(`invoice/all-sent`);
        const groups = submitReq?.data.reduce((groups, items) => {
            const date = items.createAt.split('T')[0];
            if (!groups[date]) {
              groups[date] = [];
            }
            groups[date].push(items);
            return groups;
          }, {});
          
          // Edit: to add it in the array format instead
          const groupArrays = Object.keys(groups).map((date) => {
            return {
              date,
              listItems: groups[date]
            };
          });
          const data = _.sortBy(groupArrays, 'date').reverse()
        return {
            listSent: data,
        } 
    } catch (e) {
        console.log(e)
        return {
            listSent: null
        } 
    }
}

export const fetchAllInvoice = async (): Promise<AllInvoice> => {
  try {
      const submitReq = await axiosClient.get(`invoice/all-sent`);
        const dataAllIvoice = submitReq?.data
      return {
        allInvoice: dataAllIvoice,
      } 
  } catch (e) {
      console.log(e)
      return {
        allInvoice: null
      } 
  }
}

export const fetchAllInvoiceReceived = async (): Promise<ListReceived> => {
    try {
        const submitReq = await axiosClient.get(`invoice/all-received`);
        const groups = submitReq?.data.reduce((groups, items) => {
            const date = items.createAt.split('T')[0];
            if (!groups[date]) {
              groups[date] = [];
            }
            groups[date].push(items);
            return groups;
          }, {});
          
          // Edit: to add it in the array format instead
          const groupArrays = Object.keys(groups).map((date) => {
            return {
              date,
              listItems: groups[date]
            };
          });
          const data = _.sortBy(groupArrays, 'date').reverse()
        return {
            listReceived: data
        } 
    } catch (e) {
        console.log(e)
        return {
            listReceived: null
        } 
    }
}