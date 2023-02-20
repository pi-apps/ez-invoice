import { axiosClient } from 'config/htttp';
import useToast from 'hooks/useToast';
import { useCallback, useState } from 'react';
import { Translate } from "react-auto-translate";
import { payment } from './payment';

export const usePayment = (signature:string) => {
    const [ pendingPayment, setPendingPayment ] = useState(false)
   
    const { toastError } = useToast()
    const handlePayment = useCallback(async () => {
        setPendingPayment(true)
        try {
            const submitReqInvoiceId = await axiosClient.get(`payments/get-invoice-id/${signature}`);
            if(submitReqInvoiceId.status == 200){
                const submitReq = await axiosClient.post('/payments/update-receiver', {
                        "invoiceId": submitReqInvoiceId?.data,
                        "signature": signature
                    }
                );
                const submitReqDetails = await axiosClient.get(`invoice/detail/${submitReqInvoiceId?.data}`);
                await payment(submitReqInvoiceId?.data, submitReqDetails?.data?.amountDue, submitReqInvoiceId?.data)                
            } else {
                toastError('error', <Translate>System error!!!</Translate>)
            }
        } catch (e) {
            console.log("error", e)
        } finally {
            setPendingPayment(false)
        }
    }, [])

  return { handlePayment, pendingPayment }
}
