import { configureStore } from '@reduxjs/toolkit';
import transactionReducer from '../features/transactions/transactionSlice'
import budgetReducer from '../features/budgets/budgetSlice'
export const store = configureStore({
  reducer: {
    transactions: transactionReducer,
    budget: budgetReducer,
  },
});