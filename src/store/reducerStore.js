import { configureStore, createSlice } from "@reduxjs/toolkit";

const authState = { isAuthenticated: false };
const authSlice = createSlice({
  name: "AuthReducer",
  initialState: authState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },

    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

const themeState = { isLight: true };

const themeStoreSlice = createSlice({
  name: "theme",
  initialState: themeState,
  reducers: {
    light(state) {
      state.isLight = true;
      console.log("activate")
    },
    dark(state) {
      state.isLight = false;
    },
  },
});

const authStore = configureStore({
  reducer: { auth: authSlice.reducer, theme: themeStoreSlice.reducer },
});
export const themeActions = themeStoreSlice.actions;
export const authAction = authSlice.actions;
export default authStore;
