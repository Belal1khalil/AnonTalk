import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./features/user.slice";
import { themeReducer } from "./features/theme.slice";

export const myStore = configureStore({
  reducer: {
    userReducer,
    themeReducer,
  },
});

type AppStore = typeof myStore;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispacth = AppStore["dispatch"];
