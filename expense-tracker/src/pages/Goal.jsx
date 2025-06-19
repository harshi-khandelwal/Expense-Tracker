import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addGoal, deleteGoal, updateGoalPercentage, updateAllGoalPercentages,  setAllocatedIncomePercentage, resetGoalPercentages, transferToGoals, autoTransferMonthly} from '../features/goals/goalSlice';
import ConfirmModal from '../components/ConfirmModal';
import Modal from '../components/Modal';

export default function Goal() {
  const dispatch = useDispatch()

  const goals = useSelector(state => state.goals.goals)
  const allocatedIncomePercentage = useSelector(state => state.goals.allocatedIncomePercentage)
  const income = useSelector(state => state.income.amount)

  const [name, setName] = useState('')
  const [targetAmount, setTargetAmount] = useState('')
  const [percentage, setPercentage] = useState('')
  const [incomeAllocation, setIncomeAllocation] = useState(allocatedIncomePercentage)

  const [showManualModal, setShowManualModal] = useState(false)
  const [manualPercentages, setManualPercentages] = useState([])


  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [goalToDelete, setGoalToDelete] = useState(null);
  useEffect(() => {
    dispatch(autoTransferMonthly(income))
  }, [dispatch, income])

  useEffect(() => {
    setManualPercentages(
      goals.map(goal => ({
        id: goal.id,
        name: goal.name,
        percentage: goal.percentage,
      }))
    )
  }, 
  [goals])

  const handleAddGoal = (e) => {
    e.preventDefault();
    const target = Number(targetAmount)
    const percent = Number(percentage)

    if (!name || target <= 0 || percent <= 0) {
      showModal({
    title: 'Invalid Input',
    message: 'Please enter valid goal details.',
    type: 'error'
  })
  return
      
    }

    dispatch(addGoal({ name, targetAmount: target, percentage: percent }))
    setName('');
    setTargetAmount('');
    setPercentage('');
  };

  const handleUpdateIncomeAllocation = () => {
    const value = Number(incomeAllocation);
    if (value < 0 || value > 100) {
     showModal({
    title: 'Invalid Allocation',
    message: 'Income allocation must be between 0 and 100.',
    type: 'error'
  });
  return;
    }
    dispatch(setAllocatedIncomePercentage(value))
  };

  const handleTransfer = () => {
    if (income === 0) {
     showModal({
    title: 'No Income Found',
    message: 'No income available for transfer.',
    type: 'info'
  });
  return;
    }
    dispatch(transferToGoals(income))
  };

 const handleManualSubmit = () => {
  const total = manualPercentages.reduce((sum, g) => sum + Number(g.percentage), 0)
  if (total !== 100) {
    showModal({
      title: 'Invalid Total Percentage',
      message: 'The total of all goal percentages must equal exactly 100%.',
      type: 'error',
      buttonText: 'Close'
    });
    return;
  }

  dispatch(updateAllGoalPercentages(manualPercentages));
  setShowManualModal(false);
};


  const [modalVisible, setModalVisible] = useState(false);
const [modalData, setModalData] = useState({
  title: '',
  message: '',
  type: 'info',
  buttonText: 'Close'
});

const showModal = ({ title, message, type = 'info', buttonText = 'Close' }) => {
  setModalData({ title, message, type, buttonText });
  setModalVisible(true);
};

  return (
  <div className="max-w-4xl mx-auto px-4 py-6 dark:bg-gray-900">
  {/* modal */}
  {modalVisible && (
    <Modal
      title={modalData.title}
      message={modalData.message}
      type={modalData.type}
      buttonText={modalData.buttonText}
      onClose={() => setModalVisible(false)}
    />
  )}

  <h2 className="text-4xl font-bold text-center text-blue-900 dark:text-blue-200 mb-7">Set Your Financial Goals</h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 px-4">

    <div className="bg-white dark:bg-gray-800 shadow-md p-6 rounded-xl mb-8 space-y-4 border-green-300 dark:border-green-500 border-2">
      <h1 className="text-3xl justify-center flex font-semibold text-gray-800 dark:text-white">Income Allocation</h1>

      <input
        type="number"
        value={incomeAllocation}
        min="0"
        max="100"
        onChange={(e) => setIncomeAllocation(e.target.value)}
        className="p-4 w-full border-green-300 dark:border-green-500 dark:text-white border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 dark:focus:ring-green-500"
      />
      <div className='relative group inline-block'>
      <button
        onClick={handleUpdateIncomeAllocation}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 text-2xl rounded-lg w-full font-semibold transition"
      >
        Update Income Allocation (%)
      </button>
      <div className="absolute left-1/2 -translate-x-1/2 top-full mb-2 w-64 text-center text-sm bg-white text-black p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition dark:bg-gray-800 dark:text-white">
    This allows you to set what percentage of your income will be saved into goals every month.
  </div>
      </div>
     

      <div className="mb-4 grid sm:grid-cols-2 gap-4">
        <button
          onClick={() => dispatch(resetGoalPercentages())}
          className="bg-blue-950 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-900 transition"
        >
          Reset Goal Percentages Evenly
        </button>
        <button
          onClick={handleTransfer}
          className="bg-blue-950 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-900 transition"
        >
          Transfer Income to Goals
        </button>
      </div>
    </div>

    <form onSubmit={handleAddGoal} className="bg-white dark:bg-gray-800 shadow-md p-6 rounded-xl mb-8 space-y-4 border-blue-950 dark:border-blue-300 border-2">
      <h3 className="text-3xl font-semibold text-gray-800 dark:text-white">Add New Goal</h3>
      <input
        type="text"
        placeholder="Goal Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        required
      />
      <input
        type="number"
        placeholder="Target Amount (₹)"
        min="1"
        value={targetAmount}
        onChange={(e) => setTargetAmount(e.target.value)}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        required
      />
      <input
        type="number"
        placeholder="Allocation %"
        min="1"
        max="100"
        value={percentage}
        onChange={(e) => setPercentage(e.target.value)}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        required
      />
      <div className="mb-8 grid sm:grid-cols-2 gap-4">
        <button type="submit" className="bg-blue-950 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-900 transition">
          Add Goal
        </button>
        <button
          onClick={() => setShowManualModal(true)}
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-3 rounded-lg w-full font-semibold transition"
        >
          Manual Goal Updation
        </button>
      </div>
    </form>
  </div>

  {/* goal list */}
  <h3 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4">Your Goals</h3>
  {goals.length === 0 ? (
    <p className="text-gray-600 dark:text-gray-400 text-center text-lg italic">No goals added yet.</p>
  ) : (
    <ul className="space-y-6">
      {goals.map(goal => {
        const progress = ((goal.savedAmount / goal.targetAmount) * 100).toFixed(1);
        return (
          <li key={goal.id} className="bg-white dark:bg-gray-800 p-6 shadow-md rounded-xl space-y-2">
            <h4 className="text-2xl font-bold text-gray-800 dark:text-white">{goal.name}</h4>
            <div className="text-gray-700 dark:text-gray-300 space-y-1">
              <p>Target: Rs.{goal.targetAmount}</p>
              <p>Saved: Rs.{goal.savedAmount.toFixed(2)}</p>
              <p>Progress: <span className="font-semibold">{progress}%</span></p>
            </div>

            <div className="mt-2 flex items-center gap-2">
              <input
                type="number"
                value={goal.percentage}
                min="1"
                max="100"
                onChange={(e) => dispatch(updateGoalPercentage({ id: goal.id, percentage: Number(e.target.value) }))}
                className="border p-2 rounded w-20 focus:outline-none focus:ring-2 focus:ring-yellow-300 dark:focus:ring-yellow-500 dark:bg-gray-700 dark:text-white"
              />
              <span className="text-gray-600 dark:text-gray-400">%</span>
              <span className="text-gray-600 dark:text-gray-400">Allocation</span>
            </div>

            <button
              onClick={() => {
                setGoalToDelete(goal.id);
                setShowConfirmModal(true);
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mt-4 font-semibold transition"
            >
              Delete Goal
            </button>
          </li>
        );
      })}
    </ul>
  )}

  {/* manual update modal */}
  {showManualModal && (
    <div className="fixed inset-0 bg-opacity-50 dark:bg-opacity-70 dark:bg-gray-900 flex justify-center items-center z-50 px-4">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md space-y-4 shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">Update Goal Percentages</h3>
        {manualPercentages.map((g, idx) => (
          <div key={g.id}>
            <label className="block font-medium mb-1 text-gray-700 dark:text-gray-300">{g.name}</label>
         
              <input
                type="number"
                value={g.percentage}
                onChange={(e) => {
                  const input = e.target.value;
                  const cleanValue = input === '' ? '' : Number(input);
                  const updated = [...manualPercentages];
                  updated[idx].percentage = cleanValue;
                  setManualPercentages(updated);
                }}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              min="0"
              max="100"
            />
          </div>
        ))}
        <button
          onClick={handleManualSubmit}
          className="bg-blue-900 hover:bg-blue-950 text-white px-4 py-3 rounded w-full font-semibold transition"
        >
          Save Changes
        </button>
        <button
          onClick={() => setShowManualModal(false)}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded w-full font-semibold transition"
        >
          Cancel
        </button>
      </div>
    </div>
  )}
  {showConfirmModal && (
  <ConfirmModal
    title="Delete Goal"
    message="Are you sure you want to delete this goal? This action cannot be undone."
    onConfirm={() => {
      dispatch(deleteGoal(goalToDelete));
      setShowConfirmModal(false);
      setGoalToDelete(null);
    }}
    onCancel={() => {
      setShowConfirmModal(false);
      setGoalToDelete(null);
    }}
  />
)}

</div>


  );
}

