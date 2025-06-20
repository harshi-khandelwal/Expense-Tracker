import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction } from '../features/transactions/transactionSlice';
import { nanoid } from '@reduxjs/toolkit';

function AddTransaction() {
  const dispatch = useDispatch()
  const transactions = useSelector((state) => state.transactions.transactions)
  const budget = useSelector((state) => state.budget.amount)
 const uniqueCategories = [...new Set(transactions.map((t) => t.category).filter(Boolean))]

  const [form, setForm] = useState({
    type: 'expense',
    description: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
  })

  const [showDropdown, setShowDropdown] = useState(false);

  const [showModal, setShowModal] = useState(false);


  const [pendingTransaction, setPendingTransaction] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (e.target.name === 'category') {
      setShowDropdown(true)
    }
  };

  const handleCategorySelect = (category) => {
    setForm({ ...form, category })
    setShowDropdown(false)
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    const newTransaction = {
      id: nanoid(),
      ...form,
      amount: Math.abs(parseInt(form.amount)),
    }

    if (form.type === 'expense') {
      const totalExpenses = transactions
        .filter((t) => t.type === 'expense')
        .reduce((sum, t) => sum + Number(t.amount), 0)

      if (budget > 0 && totalExpenses + newTransaction.amount > budget) {
        setPendingTransaction(newTransaction)
        setShowModal(true)
        return;
      }
    }

    dispatch(addTransaction(newTransaction))
    resetForm();
  };

  const resetForm = () => {
    setForm({ type: 'expense', description: '', amount: '', category: '', date: new Date().toISOString().split('T')[0] })
    setShowDropdown(false)
  };

  const confirmAddTransaction = () => {
    if (pendingTransaction) {
      dispatch(addTransaction(pendingTransaction))
      setPendingTransaction(null);
      resetForm();
      setShowModal(false);
    }
  };

  const cancelAddTransaction = () => {
    setPendingTransaction(null);
    setShowModal(false);
  };

  return (
<>
  <form
    onSubmit={handleSubmit}
    className="bg-gray-100 dark:bg-gray-900 dark:text-white rounded-xl shadow-md p-6 space-y-5 max-w-3xl mx-auto mt-6 border border-blue-950"
  >
    <h2 className="text-3xl font-bold text-center">Add Expenses</h2>

    <input
      type="number"
      name="amount"
      min={0}
      value={form.amount}
      onChange={handleChange}
      placeholder="Enter Amount (Rs.)"
      className="w-full p-3 rounded-lg bg-white dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-950 transition"
      required
    />

    <div className="relative">
      <input
        type="text"
        name="category"
        value={form.category}
        onChange={handleChange}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
        placeholder="Category"
        className="w-full p-3 rounded-lg bg-white dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-950 transition"
        required
      />
      {showDropdown && uniqueCategories.length > 0 && (
        <ul className="absolute z-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 w-full max-h-40 overflow-y-auto rounded mt-1 shadow-md">
          {uniqueCategories
            .filter((cat) => cat.toLowerCase().includes(form.category.toLowerCase()))
            .map((cat, idx) => (
              <li
                key={idx}
                className="px-4 py-2 hover:bg-blue-100 dark:hover:bg-blue-900 cursor-pointer text-gray-800 dark:text-gray-200"
                onClick={() => handleCategorySelect(cat)}
              >
                {cat}
              </li>
            ))}
        </ul>
      )}
    </div>

    <input
      type="text"
      name="description"
      value={form.description}
      onChange={handleChange}
      placeholder="Description (optional)"
      className="w-full p-3 rounded-lg bg-white dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-950 transition"
    />

    <input
      type="date"
      name="date"
      value={form.date}
      onChange={handleChange}
      className="w-full p-3 rounded-lg bg-white dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-950 transition"
      required
    />

    <button
      type="submit"
      className="w-full bg-blue-950 text-white py-3 rounded-lg font-semibold hover:bg-blue-900 transition"
    >
      Add Expense
    </button>
  </form>

  {/* budget exceed modal */}
  {showModal && (
    <div className="fixed inset-0  bg-opacity-40 dark:bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full text-center">
        <h3 className="text-2xl font-semibold text-red-600 mb-4 dark:text-red-500">Budget Exceeded</h3>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          This transaction will exceed your budget. Do you want to proceed?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={cancelAddTransaction}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600 rounded"
          >
            Cancel
          </button>
          <button
            onClick={confirmAddTransaction}
            className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
          >
            Yes, Add It
          </button>
        </div>
      </div>
    </div>
  )}
</>


  );
}

export default AddTransaction;
