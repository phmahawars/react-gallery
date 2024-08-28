import { createSlice, configureStore } from "@reduxjs/toolkit";
import GalleryGetSlice from "./GalleryGetSlice";
import GalleryLoaderSlice from "./GalleryLoaderSlice";
import AuthSlice from "./AuthSlice";

const GalleryStoreConfigure = configureStore({
  reducer: {
    gallery: GalleryGetSlice.reducer,
    loaderGallery: GalleryLoaderSlice.reducer,
    auth: AuthSlice.reducer,
  },
});
export default GalleryStoreConfigure;
