import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentAccount, updateAccount } from "../../services/auth.service";
import { AccountType } from "../../app-types/account.type";

export const getCurrentAccountThunk = createAsyncThunk(
  "auth/getCurrentAccountThunk",
  async (userId: string) => {
    try {
      const account = await getCurrentAccount(userId);

      return account;
    } catch (error: any) {
      throw error;
    }
  }
);

export type arguUpdateAccountType = {
  userId?: string;
  acc?: AccountType;
};
export const updateAccountThunk = createAsyncThunk(
  "auth/updateAccountThunk",
  async (args: arguUpdateAccountType) => {
    try {
      const { userId, acc } = args;
      await updateAccount(userId!, acc!);
    } catch (error: any) {
      throw error;
    }
  }
);
