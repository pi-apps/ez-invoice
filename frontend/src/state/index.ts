import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { save, load } from "redux-localstorage-simple";
import { useDispatch } from "react-redux";
import updateVersion from "./global/actions";
import invoice from "./invoice/reducer";
import user from "./user/reducer";
import payment from "./payment/reducer"
import loginGoogle from "./googleAuth/reducer";
import invoiceId from "./newInvoiceId/reducer"
import languageTrans from "./LanguageTrans/reducer"
import history from "./history/reducer"
import preview from "./preview/reducer"

const PERSISTED_KEYS: string[] = [
  "transactions",
  "lists",
];

const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: {
    invoice,
    user,
    loginGoogle,
    payment,
    invoiceId,
    languageTrans,
    history,
    preview
  },
  middleware: [
    ...getDefaultMiddleware({ thunk: true, serializableCheck: false }),
    save({ states: PERSISTED_KEYS }),
  ],
  preloadedState: load({ states: PERSISTED_KEYS }),
});

store.dispatch(updateVersion());

/**
 * @see https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
 */
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch();

export default store;
