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

export const UseGetAnInvoiceCore = (invoiceId: string) => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const getDataInvoice = async () => {
      try {
        dispatch(fetchLoading({ isLoading: true }));
        const resultInvoiceDetail = await fetchAnInvoice(invoiceId);
        dispatch(getAnInvoice(resultInvoiceDetail));
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
  }, [dispatch, invoiceId]);
};

export const UseGetAllInvoiceSentCore = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const getDataAllInvoiceSent = async () => {
      try {
        dispatch(fetchLoading({ isLoading: true }));
        const resultInvoiceDetail = await fetchAllInvoiceSent();

        dispatch(getAllInvoiceSent(resultInvoiceDetail));
        dispatch(fetchLoading({ isLoading: false }));
      } catch (e) {
        console.log(e);
      }
    };
    getDataAllInvoiceSent();
  }, [dispatch]);
};

export const UseGetAllInvoice = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const getDataAllInvoiceSent = async () => {
      try {
        dispatch(fetchLoading({ isLoading: true }));
        const resultInvoice = await fetchAllInvoice();

        dispatch(getAllInvoiceAll(resultInvoice));
        dispatch(fetchLoading({ isLoading: false }));
      } catch (e) {
        console.log(e);
      }
    };
    getDataAllInvoiceSent();
  }, [dispatch]);
};

export const UseGetAllInvoiceReceivedCore = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const getDataAllInvoiceReceived = async () => {
      try {
        dispatch(fetchLoading({ isLoading: true }));
        const resultInvoiceReceived = await fetchAllInvoiceReceived();
        dispatch(getAllInvoiceReceived(resultInvoiceReceived));
        dispatch(fetchLoading({ isLoading: false }));
      } catch (e) {
        console.log(e);
      }
    };
    getDataAllInvoiceReceived();
  }, [dispatch]);
};

export const GetAnInvoice = () => {
  const dataInvoice = useSelector<AppState, AppState["invoice"]>(
    (state) => state.invoice
  );
  return dataInvoice;
};
