import { createSlice } from '@reduxjs/toolkit';


//step 1 loading from local storage 
const loadFromLocalStorage = () => {
  try {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

//step 2 saving to local storage 
const saveToLocalStorage = (transactions) => {
    localStorage.setItem("transactions", JSON.stringify(transactions))
}

//step 3 initialise the state 
const initialState = {
  transactions: loadFromLocalStorage(),
};


//step 4 define reducers
const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {

// features are (add, delete, edit,) 

    addTransaction : (state, action) => {
      state.transactions.push(action.payload)
      saveToLocalStorage(state.transactions)
    },

    deleteTransaction : (state, action) => {
      state.transactions = state.transactions.filter(t => t.id !== action.payload);
      saveToLocalStorage(state.transactions);
    },

    editTransaction: (state, action) => {
      const index = state.transactions.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.transactions[index] = action.payload;
        saveToLocalStorage(state.transactions);
      }
    },
  }
});

// import reducers independently as well as with its slice 
export const { addTransaction, deleteTransaction, editTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
