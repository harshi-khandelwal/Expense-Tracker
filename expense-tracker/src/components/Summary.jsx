import React from 'react'
import { useSelector } from 'react-redux'

function Summary() {
 const transactions = useSelector((state) => state.transactions.transactions);

 const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0)
 const expense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0)
 const balance = income - expense 
  return (
    <div className="max-w-3xl mx-auto mt-6 bg-summary p-4 rounded shadow text-center space-y-2">
      <h2 className="text-xl font-bold">Summary</h2>
      <div className="text-green-950 font-semibold">Income: Rs. {income}</div>
      <div className="text-red-900 font-semibold">Expenses: Rs. {expense}</div>
      <div className="font-bold">Balance: Rs. {balance}</div>
    </div>
  )
}

export default Summary