import { createSlice } from "@reduxjs/toolkit";

const savedBudget = localStorage.getItem('budgetAmount');
const initialBudget = savedBudget ? parseFloat(savedBudget) : 0;
const budgetSlice = createSlice({
     name: 'budget',
        initialState: {
    amount: initialBudget,
    alertShown: false, 
    isBudgetExceeded: false,
    allowOverBudgetTransaction: null, 
  showOverBudgetModal: false,  
},
reducers: {
    setBudget(state, action) {
      state.amount = action.payload;
      state.alertShown = false; 
      localStorage.setItem('budgetAmount', action.payload);
    },

    markAlertShown(state) {
      state.alertShown = true;
    },
    
    resetAlert(state) {
      state.alertShown = false;
    },
    setBudgetExceeded: (state, action) => {
    state.isBudgetExceeded = action.payload;
    },

  triggerOverBudgetModal: (state) => {
    state.showOverBudgetModal = true;
    state.allowOverBudgetTransaction = null;
  },

  allowOverBudgetTransactionYes: (state) => {
    state.allowOverBudgetTransaction = true;
    state.showOverBudgetModal = false;
  },
  allowOverBudgetTransactionNo: (state) => {
    state.allowOverBudgetTransaction = false;
    state.showOverBudgetModal = false;
  },
  resetOverBudgetTransactionFlag: (state) => {
    state.allowOverBudgetTransaction = null;
  }
}

}
)

export const { setBudget, markAlertShown, resetAlert, setBudgetExceeded, triggerOverBudgetModal, allowOverBudgetTransactionYes, allowOverBudgetTransactionNo, resetOverBudgetTransactionFlag } = budgetSlice.actions;
export default budgetSlice.reducer;