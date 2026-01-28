import { configureStore } from "@reduxjs/toolkit";

export const myStore = configureStore({
  reducer: {},
});

type AppStore = typeof myStore;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispacth = AppStore["dispatch"];
