import BigNumber from 'bignumber.js';
import { PaymentDTO } from 'components/Menu/UserMenu/type';
import { axiosClient } from 'config/htttp';
import useToast from 'hooks/useToast';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const usePayment = (signature:string, token:string, language:string, tips:string) => {
    const [ pendingPayment, setPendingPayment ] = useState(false)
    const { toastError, toastSuccess } = useToast()
    const config = {headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': token,}};
    const navigate = useNavigate();
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
                
                const onReadyForServerCompletion = async (paymentId: string, txid: string) => {
                    console.log("onReadyForServerCompletion", paymentId, txid);
                    const resultComplete = await axiosClient.post('/payments/complete', {paymentId, txid, language}, config);
                    if (resultComplete?.status === 200) {
                        toastSuccess("Payment successfully")
                        navigate('/invoice')
                    }
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
                    const amount = tips.length > 0 ? new BigNumber(submitReqDetails?.data?.amountDue).plus(new BigNumber(tips)) : new BigNumber(submitReqDetails?.data?.amountDue).plus(new BigNumber(0))
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
    }, [signature, token, language, tips])

  return { handlePayment, pendingPayment }
}
