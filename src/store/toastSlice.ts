import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type ToastVariant = "success" | "info" | "danger";

export type ToastMessage = {
  id: string;
  title: string;
  message: string;
  variant: ToastVariant;
};

export type ToastState = {
  toasts: ToastMessage[];
};

const initialState: ToastState = {
  toasts: [],
};

let nextId = 0;

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: {
      reducer(state, action: PayloadAction<ToastMessage>) {
        state.toasts.push(action.payload);
      },
      prepare(payload: { title: string; message: string; variant?: ToastVariant }) {
        nextId += 1;
        return {
          payload: {
            id: `toast-${nextId}`,
            variant: "info" as ToastVariant,
            ...payload,
          },
        };
      },
    },
    dismissToast(state, action: PayloadAction<string>) {
      state.toasts = state.toasts.filter((toast) => toast.id !== action.payload);
    },
  },
});

export const { showToast, dismissToast } = toastSlice.actions;
export default toastSlice.reducer;
