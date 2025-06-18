import { createSlice } from '@reduxjs/toolkit';

const savedIncome = localStorage.getItem('incomeAmount');
const initialIncome = savedIncome ? parseFloat(savedIncome) : 0;

const incomeSlice = createSlice({
  name: 'income',
  initialState: {
    amount: initialIncome,
  },
  reducers: {
    setIncome: (state, action) => {
      state.amount = action.payload;
      localStorage.setItem('incomeAmount', action.payload);
    },
    resetIncome: (state) => {
      state.amount = 0;
      localStorage.removeItem('incomeAmount');
    },
  },
});

export const { setIncome, resetIncome } = incomeSlice.actions;
export default incomeSlice.reducer;
