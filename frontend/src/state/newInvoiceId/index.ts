import { useSelector } from "react-redux";
import { AppDispatch, AppState } from "state";

export const getInvoiceId = () => {
  const newInvoiceId = useSelector<AppState, AppState["invoiceId"]>(
    (state) => state.invoiceId
  );
  return newInvoiceId.invoiceId;
};

