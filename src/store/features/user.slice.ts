import { userState } from "@/types/user.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "./../../services/api-client";
import { toast } from "react-toastify";

const initialState: userState = {
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  userData: null,
};

export const signUp = createAsyncThunk(
  "/user/signup",
  async (values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    gender: string;
    phone: string;
  }) => {
    try {
      const options = {
        method: "POST",
        url: "/auth/register",
        data: values,
      };
      const { data } = await apiClient.request(options);
      console.log(data);
      return data;
    } catch (error) {
      console.log("signup failed", error);
      throw error;
    }
  },
);
export const verifyAccount = createAsyncThunk(
  "/user/verify",
  async (values: { email: string; otp: string }) => {
    try {
      const options = {
        method: "POST",
        url: "/auth/verify-account",
        data: values,
      };
      const { data } = await apiClient.request(options);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);
export const login = createAsyncThunk(
  "/user/login",
  async (values: { email: string; password: string }) => {
    try {
      const options = {
        method: "POST",
        url: "/auth/login",
        data: values,
      };
      const { data } = await apiClient.request(options);
      console.log(data);
      return data;
    } catch (error) {
      throw error;
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.userData = null;
      localStorage.removeItem("token");
      
    },
  },
  extraReducers: function (builder) {
    // SignUp cases
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.userData = action.payload;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      toast.error("Email Already exist");
    });
    // verify cases
    builder.addCase(verifyAccount.fulfilled, (state, action) => {
      console.log({ state, action });
    });
    builder.addCase(verifyAccount.rejected, (state, action) => {
      console.log({ state, action });
    });
    // login cases
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.data.accessToken;
      localStorage.setItem("token", action.payload.data.accessToken);
      console.log("login Done");
      console.log({ state, action });
    });
    builder.addCase(login.rejected, (state, action) => {
      console.log("login failed");
      console.log({ state, action });
    });
  },
});

export const { logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
