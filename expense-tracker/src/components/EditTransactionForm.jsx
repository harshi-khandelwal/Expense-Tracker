import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editTransaction } from '../features/transactions/transactionSlice';

export default function EditTransactionForm({ trans, setEditing }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ ...trans });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editTransaction({ ...form, amount: parseFloat(form.amount) }));
    setEditing(null);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-2">
      <input name="amount" type="number" value={form.amount} placeholder='Edit Amount' onChange={handleChange} className="w-full border p-1 rounded" />
      <input name="category" value={form.category} placeholder = 'Edit Category'onChange={handleChange} className="w-full border p-1 rounded" />
      <input name="description" value={form.description} placeholder='Edit Description' onChange={handleChange} className="w-full border p-1 rounded" />
      <input name="date" type="date" value={form.date} placeholder='Edit Date' onChange={handleChange} className="w-full border p-1 rounded" />
      <select name="type" value={form.type} onChange={handleChange} className="w-full border p-1 rounded">
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <div className="flex justify-end gap-2">
        <button type="button" onClick={() => setEditing(null)} className="text-gray-500">Cancel</button>
        <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">Save</button>
      </div>
    </form>
  );
}
