import { createSlice } from "@reduxjs/toolkit";
import { logIn, logOut, register } from "./operations";

const initValues = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isLoading: false,
  isError: false,
  isRefreshing: false,
};

const handlePending = (state) => {
  state.isError = false;
  state.isLoading = true;
};

const handleRejected = (state) => {
  state.isLoading = false;
  state.isError = true;
};

const handleLoginIn = (state, action) => {
  state.isLoggedIn = true;
  state.user = action.payload.user;
  state.token = action.payload.token;
};

const authSlice = createSlice({
  name: "auth",
  initialState: initValues,
  extraReducers: (bilder) => {
    bilder
      .addCase(register.pending, handlePending)
      .addCase(register.fulfilled, handleLoginIn)
      .addCase(register.rejected, handleRejected)
      .addCase(logIn.pending, handlePending)
      .addCase(logIn.fulfilled, handleLoginIn)
      .addCase(logIn.rejected, handleRejected)
      .addCase(logOut.pending, handlePending)
      .addCase(logOut.fulfilled, () => initValues)
      .addCase(logOut.rejected, handleRejected);
  },
});

export const authReducer = authSlice.reducer;
