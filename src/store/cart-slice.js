'use client';

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  totalSavings: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      
      state.totalQuantity++;
      
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          name: newItem.title || newItem.name,
          price: newItem.price,
          originalPrice: newItem.originalPrice || newItem.price * 1.1, // Mock fallback
          quantity: 1,
          totalPrice: newItem.price,
          image: newItem.image || newItem.imageUrl,
          variant: newItem.variant || 'Pack of 1'
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
      
      state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
      state.totalSavings = state.items.reduce((total, item) => total + (item.originalPrice - item.price) * item.quantity, 0);
    },
    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      
      if (existingItem) {
        state.totalQuantity--;
        if (existingItem.quantity === 1) {
          state.items = state.items.filter((item) => item.id !== id);
        } else {
          existingItem.quantity--;
          existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
        }
      }
      
      state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
      state.totalSavings = state.items.reduce((total, item) => total + (item.originalPrice - item.price) * item.quantity, 0);
    },
    deleteItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      
      if (existingItem) {
        state.totalQuantity = state.totalQuantity - existingItem.quantity;
        state.items = state.items.filter((item) => item.id !== id);
      }
      
      state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
      state.totalSavings = state.items.reduce((total, item) => total + (item.originalPrice - item.price) * item.quantity, 0);
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      state.totalSavings = 0;
    }
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;