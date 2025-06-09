import React from 'react';
import { useState } from 'react';

export default function FilterBar({ onFilter }) {
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const handleFilter = () => {
    console.log("applying filters")
    onFilter({ category , date });
  };

  return (
    <div className="max-w-3xl mx-auto mt-4 flex flex-col md:flex-row gap-3 items-center bg-filter p-4 rounded shadow">
      <input
        type="text"
        placeholder="Filter by Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border bg-buttons p-2 rounded w-full md:w-1/2"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border bg-buttons p-2 rounded w-full md:w-1/2"
      />

      <button
        onClick={handleFilter}
        className="bg-summary text-black px-4 py-2 rounded-2xl w-full md:w-auto"
      >
        Apply Filters
      </button>
    </div>
  );
}
