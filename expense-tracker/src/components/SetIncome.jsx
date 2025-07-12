import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIncome, resetIncome } from '../features/income/incomeSlice';
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

export default function SetIncome() {
  const [input, setInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const income = useSelector((state) => state.income.amount);

  const handleSubmit = () => {
    if (!isNaN(input) && input > 0) {
      dispatch(setIncome(Number(input)));
      setInput('');
      setIsEditing(false);
    } else {
      setShowModal(true);
    }
  };

  const handleEdit = () => {
    setInput(income.toString());
    setIsEditing(true);
  };

  const handleReset = () => {
    dispatch(resetIncome());
    setInput('');
    setIsEditing(false);
  };

  return (
  <div className="flex flex-col gap-3 mb-4 max-w-3xl mx-auto">
  {/* modal for invalid input */}
  {showModal && (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 dark:bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-sm w-full text-center text-gray-900 dark:text-gray-100">
        <h2 className="text-xl font-semibold mb-2 text-red-800 dark:text-red-400">Invalid Income</h2>
        <p className="mb-4">Please enter a valid number</p>
        <button
          onClick={() => setShowModal(false)}
          className="bg-blue-950 text-white px-4 py-2 rounded hover:bg-blue-900"
        >
          OK
        </button>
      </div>
    </div>
  )}

  {(income === 0 || isEditing) && (
    <div className="flex items-center gap-3">
      <input
        type="number"
        min={0}
        placeholder="Set Monthly Income (Rs.)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="p-4 rounded w-full border-green-300 border-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
      />
      {/* set inc */}
      <button
        onClick={handleSubmit}
        className="bg-green-700 text-white px-4 py-2 rounded-2xl hover:bg-green-800"
      >
        {isEditing ? 'Update' : 'Set Income'}
      </button>
    </div>
  )}

  
  {income > 0 && !isEditing && (
    <div className="text-center space-y-2 text-gray-900 dark:text-white">
      <div className="text-blue-900 dark:text-blue-300 text-3xl font-semibold">
       
        Your Monthly Income: Rs. {income}
      </div>
      <div className="flex justify-center gap-4">
        {/* edit */}
        <button
          onClick={handleEdit}
          className="bg-blue-950 text-white px-4 py-1 rounded hover:bg-blue-900 flex items-center gap-2"
        >
          <CiEdit />
          <span>Edit</span>
        </button>
        {/* reset */}
       <button
        onClick={handleReset}
        className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 flex items-center gap-2"
      >
        <MdDelete />
        <span>Reset</span>
      </button>
      </div>
    </div>
  )}
</div>

  );
}

