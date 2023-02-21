
import { axiosClient } from "config/htttp";
import _ from "lodash";
import { ListHistory } from "./type";

export const fetchAllInvoiceHistory = async (accessToken:string): Promise<ListHistory> => {
    try {
        const submitReq = await axiosClient.get(`invoice/all-sent`, {
          headers: {
            'Authorization': accessToken,
          }
        });
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
              items: groups[date]
            };
          });
          const data = _.sortBy(submitReq?.data, 'date').reverse()
          
        return {
            listItems: data.slice(0,6)
        } 
    } catch (e) {
        console.log(e)
        return {
            listItems: null
        } 
    }
}
