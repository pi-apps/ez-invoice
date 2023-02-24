import { PaymentDTO } from "components/Menu/UserMenu/type";
import { axiosClient } from "config/htttp";
export const config = {headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}};

export const onIncompletePaymentFound = (payment: PaymentDTO) => {
    console.log("onIncompletePaymentFound", payment);
    return axiosClient.post('/payments/incomplete', {payment});
  }

export const onReadyForServerApproval = (paymentId: string) => {
    const invoiceId = localStorage.getItem("invoiceId");
    console.log("invoiceId", invoiceId);
    
    console.log("onReadyForServerApproval", paymentId);
    axiosClient.post('/payments/approve', {paymentId, invoiceId}, config);
  }

export const onReadyForServerCompletion = (paymentId: string, txid: string) => {
    console.log("onReadyForServerCompletion", paymentId, txid);
    axiosClient.post('/payments/complete', {paymentId, txid}, config);
  }

export const onCancel = (paymentId: string) => {
    console.log("onCancel", paymentId);
    return axiosClient.post('/payments/cancelled_payment', {paymentId});
  }

export const onError = (error: Error, payment?: PaymentDTO) => {
    console.log("onError", error);
    if (payment) {
      console.log(payment);
      // handle the error accordingly
    }
}

export const payment = async (memo: string, amount: number, invoiceId:string) => {
    localStorage.setItem("invoiceId", invoiceId)
    const scopes = ["username", "payments", "wallet_address"];
    const result = await window.Pi.authenticate(scopes, onIncompletePaymentFound)
    
    if ( result ) {
      const paymentData = { amount, memo, metadata: {invoiceId: invoiceId} };              
      const callbacks = {
          onReadyForServerApproval,
          onReadyForServerCompletion,
          onCancel,
          onError
        };
      const payment = await window.Pi.createPayment(paymentData, callbacks);
      return payment
    } else {
      return null
    }
    // window.Pi.authenticate(scopes, onIncompletePaymentFound)
    //   .then(async function (auth) {        
    //     const paymentData = { amount, memo, metadata: {invoiceId: invoiceId} };        
    //     const callbacks = {
    //       onReadyForServerApproval,
    //       onReadyForServerCompletion,
    //       onCancel,
    //       onError
    //     };
    //     const payment = await window.Pi.createPayment(paymentData, callbacks);
    //     return payment
    //   })
    //   .catch(function (error) {
    //     console.error(error);
    //   });
}