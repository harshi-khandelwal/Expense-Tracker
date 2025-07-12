import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useSelector, useDispatch } from 'react-redux';
import { markAlertShown, setBudgetExceeded } from '../features/budgets/budgetSlice';

const COLORS = ['#087CA7', '#6B4E71', '#87B6A7'];

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

  const chartData = [
    { name: 'Expenses', value: totalExpenses },
    { name: 'Saved', value: saved },
    { name: 'Balance', value: balance < 0 ? 0 : balance },
  ];

  useEffect(() => {
    if (
      budget > 0 &&
      totalExpenses >= 0.8 * budget &&
      totalExpenses < budget &&
      !alertShown
    ) {
      setShow80Modal(true);
      dispatch(markAlertShown());
    }

    if (budget > 0 && totalExpenses >= budget) {
      dispatch(setBudgetExceeded(true));
    } else {
      dispatch(setBudgetExceeded(false));
    }
  }, [budget, totalExpenses, alertShown, dispatch]);

  return (
    <>
      {show80Modal && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
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

      <div className="bg-gray-100 dark:bg-gray-900 p-6 rounded-xl shadow border border-blue-950 dark:border-blue-700 h-full">
        <h2 className="text-3xl font-bold text-blue-950 dark:text-blue-300 mb-2 text-center">Summary</h2>
        <p className="text-center text-gray-700 dark:text-gray-300 text-lg mb-6">
          Total Income: Rs. {income}
        </p>

        {/* Grid layout for both charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          
          {/* Pie Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md h-full">
            <h3 className="text-xl font-semibold mb-3 text-blue-900 dark:text-blue-300 text-center">
              Income Breakdown
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Line Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md h-full">
            <h3 className="text-xl font-semibold mb-3 text-blue-900 dark:text-blue-300 text-center">
              Expense Trend
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart
                data={Object.values(
                  transactions
                    .filter((t) => t.type === 'expense')
                    .reduce((acc, curr) => {
                      const date = new Date(curr.date).toLocaleDateString();
                      acc[date] = acc[date] || { date, amount: 0 };
                      acc[date].amount += Number(curr.amount);
                      return acc;
                    }, {})
                )}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#ef4444"
                  strokeWidth={3}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

        </div>
      </div>
    </>
  );
}

export default Summary;
