import React from 'react';

const ConfirmModal = ({ title, message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>
        <p className="mt-2 text-gray-700 dark:text-gray-300">{message}</p>

        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 dark:text-white rounded hover:bg-gray-400 dark:hover:bg-gray-600"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
