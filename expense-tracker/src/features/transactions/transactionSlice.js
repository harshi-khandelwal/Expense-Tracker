import { createSlice, nanoid } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

//  step 1 loading
const loadFromLocalStorage = (key) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// initailising
const initialState = {
  transactions: loadFromLocalStorage('transactions'),
  subscriptions: loadFromLocalStorage('subscriptions'),
};

// add reducers
const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    // add transac
    addTransaction: (state, action) => {
      state.transactions.push(action.payload);
      saveToLocalStorage('transactions', state.transactions);
    },

    // delete transac
    deleteTransaction: (state, action) => {
      state.transactions = state.transactions.filter(t => t.id !== action.payload);
      saveToLocalStorage('transactions', state.transactions);
    },

    // edit transac
    editTransaction: (state, action) => {
      const index = state.transactions.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.transactions[index] = action.payload;
        saveToLocalStorage('transactions', state.transactions);
      }
    },

    // add subs
 addSubscription: (state, action) => {
  const { name, amount, category, frequency = 'monthly' } = action.payload;

  const newSub = {
    id: nanoid(),
    name,
    amount,
    category,
    frequency, // monthly / quarterly / yearly
    dateAdded: dayjs().format('YYYY-MM-DD'),
    paused: false,
    nextPaymentDate: dayjs().add(
      frequency === 'monthly' ? 1 : frequency === 'quarterly' ? 3 : 12,
      'month'
    ).format('YYYY-MM-DD'),
  };
  state.subscriptions.push(newSub);
  saveToLocalStorage('subscriptions', state.subscriptions);

  // add immediate expense on submit  to the trans list
  const newTransaction = {
    id: nanoid(),
    name: newSub.name,
    amount: newSub.amount,
    category: newSub.category,
    type: 'expense',
    date: dayjs().format('YYYY-MM-DD'),
  };

  state.transactions.push(newTransaction);
  saveToLocalStorage('transactions', state.transactions);
},

deleteSubscription: (state, action) => {
  state.subscriptions = state.subscriptions.filter(s => s.id !== action.payload);
  saveToLocalStorage('subscriptions', state.subscriptions);
},

togglePauseSubscription: (state, action) => {
  const sub = state.subscriptions.find(s => s.id === action.payload);
  if (sub) {
    sub.paused = !sub.paused;
    saveToLocalStorage('subscriptions', state.subscriptions);
  }
},

autoAddSubscriptions: (state) => {
  const today = dayjs();
  state.subscriptions.forEach((sub) => {
    if (sub.paused) return;
    const nextPayDate = dayjs(sub.nextPaymentDate);
    const alreadyAdded = state.transactions.some(t =>
      t.name === sub.name && dayjs(t.date).isSame(today, 'day')
    );
    if (today.isSame(nextPayDate, 'day') && !alreadyAdded) {
      state.transactions.push({
        id: nanoid(),
        name: sub.name,
        amount: sub.amount,
        type: 'expense',
        category: sub.category,
        date: today.format('YYYY-MM-DD'),
      });
      const interval = sub.frequency === 'monthly' ? 1 : sub.frequency === 'quarterly' ? 3 : 12;
      sub.nextPaymentDate = nextPayDate.add(interval, 'month').format('YYYY-MM-DD');
    }
  });

  saveToLocalStorage('transactions', state.transactions);
  saveToLocalStorage('subscriptions', state.subscriptions);
},

  },
});

export const { addTransaction, deleteTransaction, editTransaction, addSubscription, deleteSubscription, togglePauseSubscription, autoAddSubscriptions} = transactionSlice.actions;
export default transactionSlice.reducer;
