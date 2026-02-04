'use client';

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          category: newItem.category,
          price: newItem.price,
          image: newItem.image,
          imageHint: newItem.imageHint
        });
        state.totalQuantity++;
      } else {
        state.items = state.items.filter((item) => item.id !== newItem.id);
        state.totalQuantity--;
      }
    },
    removeItem(state, action) {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
      state.totalQuantity = state.items.length;
    },
    clearWishlist(state) {
      state.items = [];
      state.totalQuantity = 0;
    }
  },
});

export const wishlistActions = wishlistSlice.actions;
export default wishlistSlice.reducer;