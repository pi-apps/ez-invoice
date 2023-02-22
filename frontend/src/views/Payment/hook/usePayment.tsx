import { PaymentDTO } from 'components/Menu/UserMenu/type';
import { axiosClient } from 'config/htttp';
import useToast from 'hooks/useToast';
import { useCallback, useState } from 'react';

export const usePayment = (signature:string, token:string) => {
    const [ pendingPayment, setPendingPayment ] = useState(false)
    const { toastError } = useToast()
    const config = {headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': token,}};

    const handlePayment = useCallback(async () => {
        setPendingPayment(true)
        try {
            const submitReqInvoiceId = await axiosClient.get(`payments/get-invoice-id/${signature}`, {
                headers: {
                    'Authorization': token,
                }
            });
            if(submitReqInvoiceId.status == 200){
                const submitReq = await axiosClient.post('/payments/update-receiver', 
                    {
                        "invoiceId": submitReqInvoiceId?.data,
                        "signature": signature
                    }, 
                    {
                        headers: {
                            'Authorization': token,
                        }
                    }
                );
                const submitReqDetails = await axiosClient.get(`invoice/detail/${submitReqInvoiceId?.data}`, {
                    headers: {
                        'Authorization': token,
                    }
                });
                const invoiceId = submitReqInvoiceId?.data
                
                const onIncompletePaymentFound = (payment: PaymentDTO) => {
                    console.log("onIncompletePaymentFound", payment);
                    return axiosClient.post('/payments/incomplete', {payment}, config);
                  }
                
                const onReadyForServerApproval = (paymentId: string) => {
                    console.log('invoiceId', invoiceId)
                    console.log("onReadyForServerApproval", paymentId);
                    axiosClient.post('/payments/approve', {paymentId, invoiceId}, config);
                  }
                
                const onReadyForServerCompletion = (paymentId: string, txid: string) => {
                    console.log("onReadyForServerCompletion", paymentId, txid);
                    axiosClient.post('/payments/complete', {paymentId, txid}, config);
                  }
                
                const onCancel = (paymentId: string) => {
                    console.log("onCancel", paymentId);
                    return axiosClient.post('/payments/cancelled_payment', {paymentId}, config );
                  }
                
                const onError = (error: Error, payment?: PaymentDTO) => {
                    console.log("onError", error);
                    if (payment) {
                      console.log(payment);
                      // handle the error accordingly
                    }
                }
                const scopes = ["username", "payments"];
                const result = await window.Pi.authenticate(scopes, onIncompletePaymentFound)
               
                if ( result ) {
                    const amount = submitReqDetails?.data?.amountDue
                    const memo = submitReqInvoiceId?.data
                    const paymentData = { amount, memo, metadata: {invoiceId: submitReqInvoiceId?.data} };        
                    const callbacks = {
                        onReadyForServerApproval,
                        onReadyForServerCompletion,
                        onCancel,
                        onError
                    };
                    await window.Pi.createPayment(paymentData, callbacks);
                }             
            } else {
                toastError('error', "System error!!!")
            }
        } catch (e) {
            toastError('Error', JSON.stringify(e))
            console.log("error", e)
        } finally {
            setPendingPayment(false)
        }
    }, [signature, token])

  return { handlePayment, pendingPayment }
}
