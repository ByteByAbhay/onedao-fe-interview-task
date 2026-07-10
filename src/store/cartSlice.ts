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
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
