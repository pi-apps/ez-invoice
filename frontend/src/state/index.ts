import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { save, load } from "redux-localstorage-simple";
import { useDispatch } from "react-redux";
import updateVersion from "./global/actions";
import invoice from "./invoice/reducer";
import user from "./user/reducer";
import loginGoogle from "./googleAuth/reducer";

const PERSISTED_KEYS: string[] = [
  "user",
  "transactions",
  "lists",
  "loginGoogle",
];

const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: {
    invoice,
    user,
    loginGoogle,
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
