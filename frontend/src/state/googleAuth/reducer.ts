import { createReducer } from "@reduxjs/toolkit";
import { setAccessToken } from "./actions";
import { AccessTokenType } from "./types";

interface globalStateGoogle {
  accessTokenAuth: any;
}

export const initialState: globalStateGoogle = {
  accessTokenAuth: "",
};

export default createReducer(initialState, (builder) =>
  builder.addCase(setAccessToken, (state, action) => {
    state.accessTokenAuth = action.payload;
  })
);
