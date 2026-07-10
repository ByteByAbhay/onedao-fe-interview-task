import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type CartState = {
  quantities: Record<string, number>;
};

const initialState: CartState = {
  quantities: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<{ productId: string }>) {
      const { productId } = action.payload;
      state.quantities[productId] = (state.quantities[productId] ?? 0) + 1;
    },
    decrementQuantity(state, action: PayloadAction<{ productId: string }>) {
      const { productId } = action.payload;
      if (state.quantities[productId] !== undefined) {
        if (state.quantities[productId] <= 1) {
          delete state.quantities[productId];
        } else {
          state.quantities[productId] -= 1;
        }
      }
    },
    removeFromCart(state, action: PayloadAction<{ productId: string }>) {
      const { productId } = action.payload;
      delete state.quantities[productId];
    },
    clearCart(state) {
      state.quantities = {};
    },
  },
});

export const { addToCart, decrementQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

