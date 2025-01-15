import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItemIndex = state.items.findIndex(
        (item) => item._id === action.payload._id && item.selectedSize === action.payload.selectedSize // Ensure same size
      );

      if (existingItemIndex >= 0) {
        // Product already exists, update its quantity
        state.items[existingItemIndex].quantity += action.payload.quantity;
      } else {
        // Add new product with selected size
        state.items.push({
          ...action.payload,
          selectedSize: action.payload.selectedSize || null,
        });
      }

      // Update totals
      state.totalQuantity += action.payload.quantity;
      state.totalPrice += action.payload.price * action.payload.quantity;
    },

    removeFromCart: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item._id === action.payload._id && item.selectedSize === action.payload.selectedSize
      );
      if (itemIndex >= 0) {
        const item = state.items[itemIndex];
        state.totalQuantity -= item.quantity;
        state.totalPrice -= item.price * item.quantity;
        state.items.splice(itemIndex, 1);
      }
    },

    updateQuantity: (state, action) => {
      const { id, size, quantity } = action.payload;
      const item = state.items.find(
        (item) => item._id === id && item.selectedSize === size // Ensure correct size
      );

      if (item) {
        state.totalQuantity += quantity - item.quantity;
        state.totalPrice += (quantity - item.quantity) * item.price;
        item.quantity = quantity;
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
