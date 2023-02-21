import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "state";
import { getInvoiceId, isFetching, isFetchError, getAnInvoice, fetchDataUser } from "./actions";
import { fetchInvoiceId, fetchAnInvoice, fetchUser } from "./fetchData";

export const PaymentCore = (signature: string, token) => {
    
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
      const getDataPayment = async () => {
        try {
            dispatch(isFetching({isFetching:true}));
            const dataUser = await fetchUser(token)
            const result = await fetchInvoiceId(signature, token);
            const resultInvoice = await fetchAnInvoice(result?.invoiceId, token);
            dispatch(fetchDataUser(dataUser));
            dispatch(getInvoiceId(result));
            dispatch(getAnInvoice(resultInvoice));
            dispatch(isFetching({isFetching:false}));
        } catch (e) {
          console.log(e);
          dispatch(isFetchError({isError:true}));
        }
      };
      if ( signature.length && token.length ){
        getDataPayment()
      } else {
        dispatch(isFetchError({isError:true}));
      }
      
    }, [dispatch, signature]);
  };
  
export const GetDataPayment = () => {
    const dataPayment = useSelector<AppState, AppState["payment"]>(
      (state) => state.payment
    );
    return dataPayment;
};