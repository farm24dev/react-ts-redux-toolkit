import { createSlice } from "@reduxjs/toolkit";
import { AccountType } from "../../app-types/account.type";
import { RootState } from "../store";
import { getCurrentAccountThunk } from "./auth_thunk";
import { fabClasses } from "@mui/material";

type AuthState = {
  isAuthLoading: boolean;
  account: AccountType | null;
};

const initialState: AuthState = {
  isAuthLoading: true,
  account: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getCurrentAccountThunk.pending, (state, action) => {
      state.isAuthLoading;
      state.isAuthLoading = true;
    });
    builder.addCase(getCurrentAccountThunk.fulfilled, (state, action) => {
      state.isAuthLoading = false;
      state.account = action.payload;
    });
  },
});

export const selecteAuthState = (state: RootState) => state.auth;

export default authSlice.reducer;
