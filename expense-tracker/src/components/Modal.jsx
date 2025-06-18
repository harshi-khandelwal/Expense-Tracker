import React from 'react';

const Modal = ({ title, message, onClose, buttonText = 'Close', type = 'info' }) => {
  const titleColor = {
    success: 'text-green-600',
    error: 'text-red-600',
    info: 'text-blue-600',
  }[type];

  const buttonColor = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    info: 'bg-blue-950',
  }[type];

  return (
  <div className="fixed inset-0 bg-opacity-40 dark:bg-opacity-50 flex items-center justify-center z-100">
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center shadow-lg max-w-sm w-full">
    <h2 className={`text-xl font-semibold mb-2 ${titleColor} dark:text-white`}>{title}</h2>
    <p className="mb-4 text-gray-800 dark:text-gray-200">{message}</p>
    <button onClick={onClose} className={`${buttonColor} text-white px-4 py-2 rounded`}>
      {buttonText}
    </button>
  </div>
</div>

  );
};

export default Modal;
