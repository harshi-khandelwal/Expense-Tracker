import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addSubscription,deleteSubscription,togglePauseSubscription} from '../features/transactions/transactionSlice';
import Modal from './Modal';
import dayjs from 'dayjs';
 {/* functionalities needed : add monthly sub recuring stuff , pause button and resume 
  list to show all the subscriptions added , those category should also update , show next monthly date as well  */}
const Subscriptions = () => {
  const dispatch = useDispatch()
  const subscriptions = useSelector((state) => state.transactions.subscriptions)

  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleAddSubscription = () => {
    if (!name   ||!amount ||  !category || Number(amount) <= 0) 
      {
      setErrorMessage('Please enter valid subscription details.')
      setShowErrorModal(true)
      return;
    }

    const subData = {
      name,
      amount: Number(amount),
      category,
    };

    dispatch(addSubscription(subData));
    setShowSuccessModal(true)

    setName('')
    setAmount('')
    setCategory('')
  };

  const handleDelete = (id) => {
    dispatch(deleteSubscription(id))
  };

  const handleTogglePause = (id) => {
    dispatch(togglePauseSubscription(id))
  };

  return (

   <div className="max-w-2xl mx-auto p-6">
  {/* success */}
  {showSuccessModal && (
    <Modal
      title="Subscription Added!"
      message="An expense was added now, and this will repeat monthly."
      type="success"
      buttonText="OK"
      onClose={() => setShowSuccessModal(false)}
    />
  )}

  {/* error */}
  {showErrorModal && (
    <Modal
      title="Error"
      message={errorMessage}
      type="error"
      buttonText="Close"
      onClose={() => setShowErrorModal(false)}
    />
  )}

  <div className="flex flex-col gap-4 mb-8 bg-gray-100 dark:bg-gray-900 border border-blue-950 dark:border-blue-800 p-6 rounded-lg shadow-sm">
    <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
      Add Monthly Subscription
    </h2>

    {/* subscip form */}
    <input
      type="text"
      value={name}
      placeholder="Subscription Name"
      onChange={(e) => setName(e.target.value)}

      className="border border-gray-300 dark:border-gray-700 p-3 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-950 transition"
    />
    <input
      type="number"
      value={amount}
      placeholder="Monthly Amount (Rs.)"
      onChange={(e) => setAmount(e.target.value)}
      className="border border-gray-300 dark:border-gray-700 p-3 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-950 transition"
      min={1}
    />
    <input
      type="text"
      value={category}
      placeholder="Category"
      onChange={(e) => setCategory(e.target.value)}
      className="border border-gray-300 dark:border-gray-700 p-3 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-950 transition"
    />
    <button
      onClick={handleAddSubscription}
      className="bg-blue-950 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-900 transition"
    >
      Add Subscription
    </button>
  </div>

  {/* added subscription list  */}
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
    <h3 className="text-2xl font-semibold text-blue-950 dark:text-blue-300 mb-4">
      Your Subscriptions
    </h3>

    {subscriptions.length === 0 ? (
      <p className="text-gray-600 dark:text-gray-400">No subscriptions added yet.</p>
    ) : (
      <ul className="space-y-4">
        {subscriptions.map((sub) => (
          <li
            key={sub.id}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-300 dark:border-gray-700 pb-4"
          >
            <div>
              <p className="font-bold text-gray-800 dark:text-white">{sub.name}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Rs.{sub.amount} / month: {sub.category}
                <br />
                Status:{' '}
                <span className={sub.paused ? 'text-red-600' : 'text-green-700'}>
                  {sub.paused ? 'Paused' : 'Active'}
                </span>
                <br />
                <span className="text-sm text-blue-800 dark:text-blue-400">
                  Next Payment: {dayjs(sub.nextPaymentDate).format('DD-MM-YYYY')}
                </span>
              </p>
            </div>
            <div className="mt-3 sm:mt-0 flex gap-2">
              <button
                onClick={() => handleTogglePause(sub.id)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
              >
                {sub.paused ? 'Resume' : 'Pause'}
              </button>
              <button
                onClick={() => handleDelete(sub.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
</div>


  );
};

export default Subscriptions;
