import { createSlice } from "@reduxjs/toolkit";

const budgetSlice = createSlice({
     name: 'budget',
        initialState: {
    amount: 0,
    alertShown: false, 
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
    }
}
})

export const { setBudget, markAlertShown, resetAlert } = budgetSlice.actions;
export default budgetSlice.reducer;