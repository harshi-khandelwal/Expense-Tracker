import React, { useState } from 'react';
import { useSelector } from 'react-redux';


export default function FilterBar({ onFilter }) {
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const transactions = useSelector((state) => state.transactions.transactions);
  const uniqueCategories = [...new Set(transactions.map(t => t.category).filter(Boolean))]

  const handleFilter = () => {
    console.log("Applying filters");
    onFilter({ category, date });
  };

   const handleReset = () => {
    setCategory('');
    setDate('');
    onFilter({ category: '', date: '' }); 
  };

  return (
<div className="max-w-3xl mx-5 mt-4 flex flex-col md:flex-row gap-3 items-center bg-blue-50 dark:bg-gray-800 p-4 rounded-2xl shadow">
  <select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-white p-2 rounded w-full md:w-1/2 focus:ring-2 focus:ring-blue-600"
  >
    <option value="">All Categories</option>
    {uniqueCategories.map((cat, idx) => (
      <option key={idx} value={cat}>
        {cat}
      </option>
    ))}
  </select>

  <input
    type="date"
    value={date}
    onChange={(e) => setDate(e.target.value)}
    className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-white p-2 rounded w-full md:w-1/2 focus:ring-2 focus:ring-blue-600"
  />

  <button
    onClick={handleFilter}
    className="bg-green-700 text-white px-4 py-2 rounded-2xl w-full md:w-auto hover:bg-green-800 transition"
  >
    Apply Filters
  </button>

  <button
    onClick={handleReset}
    className="bg-red-700 text-white px-4 py-2 rounded-2xl w-full md:w-auto hover:bg-red-800 transition"
  >
    Reset Filters
  </button>
</div>


  );
}
