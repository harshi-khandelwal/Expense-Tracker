import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  saved: 0,
};

const summarySlice = createSlice({
  name: 'summary',
  initialState,
  reducers: {
    updateSavedInSummary: (state, action) => {
      state.saved = action.payload;
    },
    resetSaved: (state) => {
      state.saved = 0;
    },
  },
});

export const { updateSavedInSummary, resetSaved } = summarySlice.actions;
export default summarySlice.reducer;
