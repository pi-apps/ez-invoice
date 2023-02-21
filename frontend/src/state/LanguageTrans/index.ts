import { useSelector } from "react-redux";
import { AppDispatch, AppState } from "state";

export const getLanguageTrans = () => {
  const newInvoiceId = useSelector<AppState, AppState["languageTrans"]>(
    (state) => state.languageTrans
  );
  return newInvoiceId.languageTrans;
};

