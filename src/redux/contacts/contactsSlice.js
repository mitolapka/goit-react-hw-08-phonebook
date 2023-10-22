import { addContact, deleteContact, fetchAll } from './operations';

const { createSlice, isAnyOf } = require('@reduxjs/toolkit');

const defaultStatus = {
  pending: 'pending',
  fulfilled: 'fulfilled',
  rejected: 'rejected',
};

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const actionsArr = [fetchAll, addContact, deleteContact];

const getActionsStatusArr = status => {
  return actionsArr.map(el => el[status]);
};

const handlePending = state => {
  state.isLoading = true;
};

const handleFulfilled = (state, action) => {
  state.isLoading = false;
  state.error = null;
  state.items = action.payload;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        isAnyOf(...getActionsStatusArr(defaultStatus.pending)),
        handlePending
      )
      .addMatcher(
        isAnyOf(...getActionsStatusArr(defaultStatus.fulfilled)),
        handleFulfilled
      )
      .addMatcher(
        isAnyOf(...getActionsStatusArr(defaultStatus.rejected)),
        handleRejected
      );
  },
});

export const contactsReducer = contactsSlice.reducer;