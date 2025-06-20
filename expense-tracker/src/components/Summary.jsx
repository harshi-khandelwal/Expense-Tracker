import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { markAlertShown, setBudgetExceeded } from '../features/budgets/budgetSlice';

function Summary() {
  const dispatch = useDispatch();

  const transactions = useSelector((state) => state.transactions.transactions);
  const budget = useSelector((state) => state.budget.amount);
  const alertShown = useSelector((state) => state.budget.alertShown);
  const budgetExceeded = useSelector((state) => state.budget.budgetExceeded);
  const income = useSelector((state) => state.income.amount); 
  const saved = useSelector((state) => state.goals.savedTotal);

  const [show80Modal, setShow80Modal] = useState(false);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = income - totalExpenses - saved;

  useEffect(() => {
    if (
      budget > 0 &&
      totalExpenses >= 0.8 * budget &&
      totalExpenses < budget &&
      !alertShown
    ) {
      setShow80Modal(true)
      dispatch(markAlertShown())
    }

    if (budget > 0 && totalExpenses >= budget) {
      dispatch(setBudgetExceeded(true))

    } else {
      dispatch(setBudgetExceeded(false))
    }
  }, [budget, totalExpenses, alertShown, dispatch]);

  return (
  <>
  {show80Modal && (
    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded shadow-md max-w-md w-full text-center">
        <h2 className="text-xl font-semibold mb-2 text-yellow-600">Budget Warning</h2>
        <p className="mb-4 text-gray-800 dark:text-gray-200">
          You've spent over 80% of your monthly budget!
        </p>
        <button
          onClick={() => setShow80Modal(false)}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          OK
        </button>
      </div>
    </div>
  )}
  {budgetExceeded && (
    <div className="fixed inset-0 bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded shadow-lg max-w-md w-full text-center">
        <h2 className="text-xl font-bold text-red-800 dark:text-red-400 mb-3">
          Budget Exhausted
        </h2>
        <p className="mb-4 text-gray-800 dark:text-gray-200">
          You have spent your entire budget. Be cautious with further expenses.
        </p>
        <button
          className="bg-red-800 text-white px-4 py-2 rounded"
          onClick={() => dispatch(setBudgetExceeded(false))}
        >
          Dismiss
        </button>
      </div>
    </div>
  )}

  <div className="max-w-full mx-5 mt-6 bg-gray-100 dark:bg-gray-900 p-4 rounded shadow text-center space-y-2 border border-blue-950 dark:border-blue-700">
    <h2 className="text-3xl font-bold text-blue-950 dark:text-blue-300">Summary</h2>
    <div className="text-green-700 dark:text-green-400 text-2xl font-semibold">
      Income : Rs. {income}
    </div>
    <div className="text-red-600 dark:text-red-400 text-2xl font-semibold">
      Expenses : Rs. {totalExpenses}
    </div>
    <div className="text-blue-900 dark:text-blue-700 text-2xl font-semibold">
      Saved : Rs. {saved}
    </div>
    <div className="font-semibold text-2xl text-gray-900 dark:text-white">
      Balance : Rs. {balance}
    </div>
  </div>
</>

  );
}

export default Summary;
