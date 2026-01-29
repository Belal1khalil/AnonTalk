import { userState } from "@/types/user.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "./../../services/api-client";
import { toast } from "react-toastify";

const initialState: userState = {
  token: null,
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: function (builder) {
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.userData = action.payload
    });
    builder.addCase(signUp.rejected, (state, action) => {
       toast.error("Email Already exist")
    });
  },
});

export const userReducer = userSlice.reducer;
