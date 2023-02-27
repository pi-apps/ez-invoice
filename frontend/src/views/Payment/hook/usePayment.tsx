import BigNumber from 'bignumber.js';
import { PaymentDTO } from 'components/Menu/UserMenu/type';
import { axiosClient } from 'config/htttp';
import { GetTranslateHolder } from 'hooks/TranSlateHolder';
import useToast from 'hooks/useToast';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from 'state/user';
import { payment_text } from 'translation/languages/payment_text';
import { paymentTranslate } from 'translation/translateArrayObjects';

export const usePayment = (signature:string, token:string, language:string, tips:string) => {
    const [ pendingPayment, setPendingPayment ] = useState(false)
    const { toastError, toastSuccess } = useToast()
    const config = {headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': token,}};
    const navigate = useNavigate();

    // Translate
    const DataAb = getUser();
    const languageUserApi = DataAb?.language
    const [stateText, setStateText] = useState(payment_text);
    const fcTransLateText = async (logerror,language) => {
        const resErorText = await GetTranslateHolder(
        logerror,
        language
        );
        toastError(resErorText)
    };

   const requestTrans = async () => {
     try {
       const resData = await paymentTranslate(languageUserApi);
       setStateText(resData)
     } catch (error) {
       console.log(error)
     }
   }
   useEffect(() => {
     if (languageUserApi) {
       requestTrans();
     } else if (!languageUserApi) {
       setStateText(payment_text);
     }
   }, [languageUserApi]);

    const handlePayment = useCallback(async () => {
        setPendingPayment(true)
        try {
            const submitReqInvoiceId = await axiosClient.get(`payments/get-invoice-id/${signature}`, {
                headers: {
                    'Authorization': token,
                }
            });
            if(submitReqInvoiceId.status == 200){
                const submitReqDetails = await axiosClient.get(`invoice/detail/${submitReqInvoiceId?.data}`, {
                    headers: {
                        'Authorization': token,
                    }
                });
                const invoiceId = submitReqInvoiceId?.data
                
                const onIncompletePaymentFound = (payment: PaymentDTO) => {
                    console.log("onIncompletePaymentFound", payment);
                    return axiosClient.post('/payments/incomplete', {payment,language}, config);
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
                        setPendingPayment(false)
                        toastSuccess(stateText.text_payment_success)
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
                const scopes = ["username", "payments", "wallet_address"];
                const result = await window.Pi.authenticate(scopes, onIncompletePaymentFound)
               
                if ( result ) {
                    const amount = tips.length > 0 ? new BigNumber(submitReqDetails?.data?.amountDue).plus(new BigNumber(tips)) : new BigNumber(submitReqDetails?.data?.amountDue).plus(new BigNumber(0))
                    const memo = submitReqInvoiceId?.data
                    const paymentData = { amount, memo, metadata: {invoiceId: submitReqInvoiceId?.data, tip:tips}};
                    console.log("paymentData", paymentData);

                    const callbacks = {
                        onReadyForServerApproval,
                        onReadyForServerCompletion,
                        onCancel,
                        onError
                    };
                    await window.Pi.createPayment(paymentData, callbacks);
                }             
            } else {
                toastError(stateText.text_error, stateText.text_system_error!!!)
            }
        } catch (e:any) {
            const errorText = `Error, ${e?.response?.data?.message}`
            fcTransLateText(errorText, languageUserApi)
        } finally {
            setPendingPayment(false)
        }
    }, [signature, token, language, tips])

  return { handlePayment, pendingPayment }
}
