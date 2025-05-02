import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addItem(state, action) {
      const item = action.payload;
      const existingCartItemIndex = state.items.findIndex((cartItem) => cartItem.id === item.id);

      if (existingCartItemIndex > -1) {
        // Update quantity of existing item
        const existingItem = state.items[existingCartItemIndex];
        state.items[existingCartItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
      } else {
        // Add new item with quantity 1
        state.items.push({ ...item, quantity: 1 });
      }
    },
    removeItem(state, action) {
      const id = action.payload;
      const existingCartItemIndex = state.items.findIndex((cartItem) => cartItem.id === id);

      if (existingCartItemIndex > -1) {
        const existingItem = state.items[existingCartItemIndex];
        if (existingItem.quantity === 1) {
          // Remove item if quantity is 1
          state.items.splice(existingCartItemIndex, 1);
        } else {
          // Decrease quantity
          state.items[existingCartItemIndex] = {
            ...existingItem,
            quantity: existingItem.quantity - 1,
          };
        }
      }
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;