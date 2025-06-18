import { createSlice } from "@reduxjs/toolkit";

const budgetSlice = createSlice({
     name: 'budget',
        initialState: {
    amount: 0,
    alertShown: false, 
    isBudgetExceeded: false,
    allowOverBudgetTransaction: null, 
  showOverBudgetModal: false,  
},
reducers: {
    setBudget(state, action) {
      state.amount = action.payload;
      state.alertShown = false; 
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