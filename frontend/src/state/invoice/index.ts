import { useSelector } from "react-redux";
import { AppState } from "state";


export const GetDataInvoice = () => {
    const dataInvoice = useSelector<AppState, AppState['invoice']>((state) => state.invoice)
    return [ dataInvoice ]
}