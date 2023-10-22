const { createSlice } = require('@reduxjs/toolkit');
const { register, logIn, logOut, refreshUser } = require('./operations');

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  isError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [register.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.isError = null;
    },
    [register.rejected](state, action) {
      state.isLoggedIn = false;
      state.isError = action.payload;
    },
    [logIn.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.isError = null;
    },
    [logIn.rejected](state, action) {
      state.isLoggedIn = false;
      state.isError = action.payload;
    },
    [logOut.fulfilled](state) {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
      state.isError = null;
    },
    [refreshUser.pending](state) {
      state.isRefreshing = true;
      state.isError = null;
    },
    [refreshUser.fulfilled](state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isRefreshing = false;
      state.isError = null;
    },
    [refreshUser.rejected](state) {
      state.isRefreshing = false;
      state.isError = null;
    },
  },
});

export const authReducer = authSlice.reducer;