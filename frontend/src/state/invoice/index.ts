import { useSelector } from "react-redux";
import { AppState } from "state";

export const GetDataInvoice = () => {
    const dataInvoice = useSelector<AppState, AppState['invoice']>((state) => state.invoice)
    return [ dataInvoice ]
}

export const GetTabInvoice = () => {
    const dataTabActive = useSelector<AppState, AppState['invoice']>((state) => state.invoice)
    return [ dataTabActive ]
}
export const GetAllInvoice = () => {
    const allInvoice = useSelector<AppState, AppState['invoice']>((state) => state.invoice)
    return [ allInvoice ]
}
