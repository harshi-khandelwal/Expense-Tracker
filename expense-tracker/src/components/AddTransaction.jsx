import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTransaction } from '../features/transactions/transactionSlice';
import { nanoid } from '@reduxjs/toolkit';

// since we are adding information dispatch hook will be used 
 function AddTransaction() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    type: 'expense',
    description: '',
    amount: '',
    category: '',
    date: '',
  });



  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      id: nanoid(),
      ...form,
      amount: parseInt(form.amount),
    };

    dispatch(addTransaction(newTransaction));

    setForm({ type: 'expense', description: '', amount: '', category: '', date: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4 max-w-3xl mx-auto mt-4">
      <h2 className="text-2xl font-bold text-center">Add Transaction</h2>

        <input
        type="number"
        name="amount"
        value={form.amount}
        onChange={handleChange}
        placeholder="Amount"
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="text"
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Category"
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="text"
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full border p-2 rounded"    
        required    
      />

      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
        Add Transaction
      </button>
    </form>
  );
}

export default AddTransaction
