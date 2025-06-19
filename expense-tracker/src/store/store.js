import { configureStore } from '@reduxjs/toolkit';
import transactionReducer from '../features/transactions/transactionSlice'
import budgetReducer from '../features/budgets/budgetSlice'
import incomeReducer from '../features/income/incomeSlice';
import goalReducer from '../features/goals/goalSlice'
import summaryReducer from '../features/summary/summarySlice'
export const store = configureStore({
  reducer: {
    transactions: transactionReducer,
    budget: budgetReducer,
    income: incomeReducer,
    goals: goalReducer,
    summary: summaryReducer,
  },
});