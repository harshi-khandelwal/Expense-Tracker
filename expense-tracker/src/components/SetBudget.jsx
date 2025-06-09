import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setBudget } from '../features/budgets/budgetSlice';

export default function SetBudget() {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (!isNaN(input) && input > 0) {
      dispatch(setBudget(Number(input)));
      setInput('');
    } else {
      alert("Please enter a valid number");
    }
  };

  return (
    <div className="flex items-center gap-3 mb-4 max-w-3xl mx-auto">
      <input
        type='number'
        placeholder="Set Monthly Budget (Rs.)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <button
        onClick={handleSubmit}
        className="bg-summary text-black px-4 py-2 rounded-2xl"
      >
        Set Budget
      </button>
    </div>
  );
}
