import { themeState } from "@/types/theme.types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: themeState = {
  mode: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const themeReducer = themeSlice.reducer;
export const { toggleTheme } = themeSlice.actions;
