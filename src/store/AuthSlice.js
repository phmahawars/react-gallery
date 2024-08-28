import { createSlice } from "@reduxjs/toolkit";
import { tokenDecode } from "../functions/tokenGenerate";
const INITIAL_VALUE = () => {
  const token_gallery = sessionStorage.getItem("token_gallery");
  if (token_gallery != null) {
    if (Number(tokenDecode(token_gallery)) >= Date.now() / 1000) {
      return { token: sessionStorage.getItem(token_gallery) };
    } else {
      sessionStorage.clear();
    }
  } else {
    return false;
  }
  return false;
};
const AuthSlice = createSlice({
  name: "auth",
  initialState: INITIAL_VALUE(),
});

export const AuthSliceAction = AuthSlice.actions;
export default AuthSlice;
