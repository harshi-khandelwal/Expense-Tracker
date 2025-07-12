import React from 'react';
import SetIncome from './SetIncome';
import SetBudget from './SetBudget';
import Summary from './Summary';

function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Income & Budget */}
        <div className="flex flex-col gap-6 col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Set Monthly Income</h2>
            <SetIncome />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Set Monthly Budget</h2>
            <SetBudget />
          </div>
        </div>

        {/* Right Side: Summary */}
        <div className="col-span-1 lg:col-span-2">
          <Summary />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
