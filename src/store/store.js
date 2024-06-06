import { configureStore, createSlice } from "@reduxjs/toolkit";

// Auth -----------------------------------------------------------------------------------------

const authState = {
  token: "",
  userId: "",
  email: "",
  name: "",
  image: "",
};

const authSlice = createSlice({
  name: "Auth",
  initialState: authState,
  reducers: {
    signup(state, action) {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.email = action.payload.email;
    },
    login(state, action) {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.image = action.payload.url;
    },
    logout(state, action) {
      state.token = "";
      state.userId = "";
      state.email = "";
      state.name = "";
      state.image = "";
    },
    update(state, action) {
      state.name = action.payload.name;
      state.image = action.payload.url;
    },
  },
});

// Expense ----------------------------------------------------------------------------------------------

const expenseState = {
  expense: [],
};

const expenseSlice = createSlice({
  name: "expense",
  initialState: expenseState,
  reducers: {
    addExpense(state, action) {
      state.expense = action.payload;
    },
  },
});

const themeState = {
  theme: true,
};

// Theme -----------------------------------------------------------------------------------------

const themeSlice = createSlice({
  name: "theme",
  initialState: themeState,
  reducers: {
    changeTheme(state) {
      state.theme = !state.theme;
    },
  },
});

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    exp: expenseSlice.reducer,
    theme: themeSlice.reducer,
  },
});

export const AuthActions = authSlice.actions;
export const ExpenseActions = expenseSlice.actions;
export const ThemeActions = themeSlice.actions;

export default store;
