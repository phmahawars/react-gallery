import { createSlice } from "@reduxjs/toolkit";

const galleryGetSlice = createSlice({
  name: "gallery",
  initialState: [],
  reducers: {
    getImages: (state, action) => {
      return action.payload;
    },
    appendImages: (state, action) => {
      return [...state, ...action.payload];
    },
  },
});
export const galleryGetSliceAction = galleryGetSlice.actions;
export default galleryGetSlice;
