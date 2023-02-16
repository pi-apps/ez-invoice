import { createAction } from "@reduxjs/toolkit";
import { AccessTokenType } from "./types";

export const setAccessToken = createAction<string | undefined>("loginGoogle");
