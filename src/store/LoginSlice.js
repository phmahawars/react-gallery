import { createSlice } from "@reduxjs/toolkit";

const LoginSlice = createSlice({
  name: "login",
  initialState: {
    username: "",
    password: "",
    sessionCreat: "",
    sessionOut: "",
  },
  reducers: {
    setLogin: (state, action) => {
      // return action.payload;
    },
  },
});
export const LoginSliceAction = LoginSlice.actions;
export default LoginSlice;
