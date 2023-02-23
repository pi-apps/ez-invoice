import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "state";
import {
    fetchAllInvoiceHistory
} from "./fetchData";
import {
    getHistory,
    fetchLoadingHistory
} from "./actions";

export const UseGetAllInvoiceHistoryCore = (accessToken:string) => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const getDataAllInvoiceSent = async () => {
      try {
        dispatch(fetchLoadingHistory({ isLoading: true }));
        const resultInvoiceDetail = await fetchAllInvoiceHistory(accessToken);
        dispatch(getHistory(resultInvoiceDetail));
        dispatch(fetchLoadingHistory({ isLoading: false }));
      } catch (e) {
        console.log(e);
      }
    };
    if (accessToken?.length){
        getDataAllInvoiceSent();
    } else {
      dispatch(getHistory({listItems: null}));
    }
    
  }, [dispatch, accessToken]);
};

export const GetHistory = () => {
  const dataInvoice = useSelector<AppState, AppState["history"]>(
    (state) => state.history
  );
  return dataInvoice;
};
