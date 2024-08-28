import { createSlice } from "@reduxjs/toolkit";

const GalleryLoaderSlice = createSlice({
  name: "loaderGallery",
  initialState: {
    fetchDone: 0,
    currentlyFetching: false,
  },
  reducers: {
    markFetchDone: (state) => {
      state.fetchDone++;
    },
    markFetchStarted: (state) => {
      state.currentlyFetching = true;
    },
    markFetchFinished: (state) => {
      state.currentlyFetching = false;
    },
  },
});
export const GalleryLoaderSliceAction = GalleryLoaderSlice.actions;
export default GalleryLoaderSlice;
