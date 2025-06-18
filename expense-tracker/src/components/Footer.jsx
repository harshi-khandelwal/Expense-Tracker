import React from 'react'

function Footer() {
  return (
 <div>
  <footer className="bg-blue-950 text-gray-100 dark:bg-gray-900 dark:text-gray-200 py-10 mt-20 ">
    <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8"> 
      <div>
        <h2 className="text-2xl font-bold mb-2"> ExpenseTracker</h2>
        <p className="text-sm text-gray-400 dark:text-gray-400">
          Track your income, expenses, and goals effortlessly. Stay in control of your finances every day.
        </p>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-400 dark:text-gray-300">Built With Love</h3>
        <p className="text-sm text-gray-400 dark:text-gray-400">
          React, Redux, Tailwind CSS<br />
          Made with purpose by <span className="text-green-300 font-medium">Harshi Khandelwal</span>
        </p>
        <div className="flex gap-4 mt-4">
          <a
            href="https://github.com/harshi-khandelwal"
            target="_blank"
            className="hover:text-green-300 transition text-lg"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/harshi-khandelwal-0b61b5316"
            target="_blank"
            className="hover:text-green-300 transition text-lg"
          >
            LinkedIn
          </a>
        </div>
      </div>

    </div>

    <div className="mt-10 text-center text-xs text-gray-500 dark:text-gray-400 border-t border-gray-700 pt-4">
      © {new Date().getFullYear()} ExpenseTracker. All rights reserved.
    </div>
  </footer>
</div>

  )
}

export default Footer