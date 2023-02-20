import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "state";
import { getInvoiceId, isFetching, isFetchError, getAnInvoice, fetchDataUser } from "./actions";
import { fetchInvoiceId, fetchAnInvoice, fetchUser } from "./fetchData";

export const PaymentCore = (signature: string) => {
    
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
      const getDataPayment = async () => {
        try {
            dispatch(isFetching({isFetching:true}));
            const dataUser = await fetchUser()
            const result = await fetchInvoiceId(signature);
            const resultInvoice = await fetchAnInvoice(result?.invoiceId);
            dispatch(fetchDataUser(dataUser));
            dispatch(getInvoiceId(result));
            dispatch(getAnInvoice(resultInvoice));
            dispatch(isFetching({isFetching:false}));
        } catch (e) {
          console.log(e);
          dispatch(isFetchError({isError:true}));
        }
      };
      if ( signature.length ){
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