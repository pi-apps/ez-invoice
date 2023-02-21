import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "state";
import {
  fetchAnInvoice,
  fetchAllInvoiceSent,
  fetchAllInvoiceReceived,
  fetchAllInvoice,
} from "./fetchData";
import {
  getAnInvoice,
  fetchLoading,
  fetchFailure,
  getAllInvoiceSent,
  getAllInvoiceReceived,
  getAllInvoiceAll,
} from "./actions";

export const GetDataInvoice = () => {
  const dataInvoice = useSelector<AppState, AppState["invoice"]>(
    (state) => state.invoice
  );
  return [dataInvoice];
};

export const GetTabInvoice = () => {
  const dataTabActive = useSelector<AppState, AppState["invoice"]>(
    (state) => state.invoice
  );
  return [dataTabActive];
};
export const GetAllInvoice = () => {
  const allInvoice = useSelector<AppState, AppState["invoice"]>(
    (state) => state.invoice
  );
  return [allInvoice];
};

export const UseGetAnInvoiceCore = (invoiceId: string, accessToken:string) => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const getDataInvoice = async () => {
      try {
        dispatch(fetchLoading({ isLoading: true }));
        const resultInvoiceDetail = await fetchAnInvoice(invoiceId, accessToken);
        // console.log('resultInvoiceDetail', resultInvoiceDetail)
        if(resultInvoiceDetail){
          await dispatch(getAnInvoice(resultInvoiceDetail));
        }
        dispatch(fetchLoading({ isLoading: false }));
      } catch (e) {
        console.log(e);
      }
    };
    if (invoiceId.length) {
      getDataInvoice();
    } else {
      dispatch(getAnInvoice({ details: null }));
      dispatch(fetchFailure({ isFailure: true }));
    }
  }, [dispatch, invoiceId, accessToken]);
};

export const UseGetAllInvoiceSentCore = (accessToken:string) => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const getDataAllInvoiceSent = async () => {
      try {
        dispatch(fetchLoading({ isLoading: true }));
        const resultInvoiceDetail = await fetchAllInvoiceSent(accessToken);

        dispatch(getAllInvoiceSent(resultInvoiceDetail));
        dispatch(fetchLoading({ isLoading: false }));
      } catch (e) {
        console.log(e);
      }
    };
    if (accessToken?.length){
        getDataAllInvoiceSent();
    } else {
      dispatch(getAllInvoiceSent({listSent: null,}));
    }
    
  }, [dispatch, accessToken]);
};

export const UseGetAllInvoice = (accessToken:string) => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const getDataAllInvoiceSent = async () => {
      try {
        dispatch(fetchLoading({ isLoading: true }));
        const resultInvoice = await fetchAllInvoice(accessToken);
        dispatch(getAllInvoiceAll(resultInvoice));
        dispatch(fetchLoading({ isLoading: false }));
      } catch (e) {
        console.log(e);
      }
    };
    if( accessToken?.length ){
      getDataAllInvoiceSent();
    } else {
      dispatch(getAllInvoiceAll({ allInvoice: null }));
    }
    
  }, [dispatch, accessToken]);
};

export const UseGetAllInvoiceReceivedCore = (accessToken:string) => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const getDataAllInvoiceReceived = async () => {
      try {
        dispatch(fetchLoading({ isLoading: true }));
        const resultInvoiceReceived = await fetchAllInvoiceReceived(accessToken);
        dispatch(getAllInvoiceReceived(resultInvoiceReceived));
        dispatch(fetchLoading({ isLoading: false }));
      } catch (e) {
        console.log(e);
      }
    };
    if ( accessToken?.length ) {
      getDataAllInvoiceReceived()
    } else {
      dispatch(getAllInvoiceReceived({ listReceived: null }));
    }
    
  }, [dispatch, accessToken]);
};

export const GetAnInvoice = () => {
  const dataInvoice = useSelector<AppState, AppState["invoice"]>(
    (state) => state.invoice
  );
  return dataInvoice;
};
