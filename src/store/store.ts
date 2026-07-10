import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import toastReducer from "./toastSlice";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    toast: toastReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
