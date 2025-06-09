import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { markAlertShown } from '../features/budgets/budgetSlice';
import { useEffect } from 'react';


function Summary() {
 const transactions = useSelector((state) => state.transactions.transactions);

 const totalIncome = transactions
  .filter(t => t.type === 'income')
  .reduce((sum, t) => sum + Number(t.amount), 0);

const totalExpenses = transactions
  .filter(t => t.type === 'expense')
  .reduce((sum, t) => sum + Number(t.amount), 0);

const balance = totalIncome - totalExpenses;
const budget = useSelector(state => state.budget.amount);
const alertShown = useSelector(state => state.budget.alertShown);
const dispatch = useDispatch();

useEffect(() => {
  if (budget > 0 && totalExpenses >= 0.8 * budget && !alertShown) {
    alert(" You've spent over 80% of your monthly budget!");
    dispatch(markAlertShown());
  }
}, [budget, totalExpenses, alertShown, dispatch]);


  return (
    <div className="max-w-3xl mx-auto mt-6 bg-summary p-4 rounded shadow text-center space-y-2">
      <h2 className="text-xl font-bold">Summary</h2>
      <div className="text-green-950 font-semibold">Income: Rs. {totalIncome}</div>
      <div className="text-red-900 font-semibold">Expenses: Rs. {totalExpenses}</div>
      <div className="font-bold">Balance: Rs. {balance}</div>
    </div>
  )
}

export default Summary