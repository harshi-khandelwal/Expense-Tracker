import { useState, useEffect } from 'react';
import AddTransaction from './components/AddTransaction';
import TransactionList from './components/TransactionList';
import Summary from './components/Summary';
import FilterBar from './components/FilterBar';
import SetBudget from './components/SetBudget';
import SetIncome from './components/SetIncome';
import Subscriptions from './components/Subscription';
import './App.css';
import { useDispatch } from 'react-redux';
import { autoAddSubscriptions } from './features/transactions/transactionSlice';
import Dashboard from './components/Dashboard';

function App() {
  const [filters, setFilters] = useState({ category: '', date: '' });
  const dispatch = useDispatch();
  // auto add subscrip
  useEffect(() => {
    dispatch(autoAddSubscriptions());
  }, [dispatch]);
  return (
   
      <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Dashboard/>



        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 px-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-300 dark:border-gray-700">
            <AddTransaction />
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-300 dark:border-gray-700">
            <Subscriptions />
          </div>
        </div>
        <FilterBar onFilter={setFilters} />
        <TransactionList filters={filters} />
      </div>
  );
}

export default App;
