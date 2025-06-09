import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteTransaction } from '../features/transactions/transactionSlice';
import EditTransactionForm from './EditTransactionForm';
import { useState } from 'react';
import FilterBar from './FilterBar';


// purpose : deletion , editing, filtering of transaction 
function TransactionList({filters}) {
  const transactions = useSelector((state) => state.transactions.transactions);
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(null);

  const filteredTrans = transactions.filter(trans => {
  const categoryMatch = filters.category ? trans.category.toLowerCase().includes(filters.category.toLowerCase()) : true;
  const dateMatch = filters.date ? trans.date === filters.date : true;
  return categoryMatch && dateMatch;
  })

  return (
    <div className="max-w-5xl mx-auto mt-6">
      <h2 className="text-xl mb-2">Transactions</h2>
      {filteredTrans.length === 0 ?(
        <p className="text-gray-500">No matching transactions yet.</p>
      ):(
        <ul className="space-y-2">
                 {filteredTrans.map((trans) =>
            editing === trans.id ? (
              <EditTransactionForm key={trans.id} trans={trans} setEditing={setEditing} />
            ) : (
              <li key={trans.id} className="flex justify-between items-center bg-white p-4 rounded shadow">
                <div>
                  <p className="font-medium">{trans.description}</p>
                  <p className="text-sm text-gray-600">{trans.category} • {trans.date}</p>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${trans.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {trans.type === 'income' ? '+' : '-'}Rs. {trans.amount}
                  </p>
                  <div className="text-xs mt-1 flex gap-2">
                    <button onClick={() => setEditing(trans.id)} className="text-blue-500 hover:underline">Edit</button>
                    <button onClick={() => dispatch(deleteTransaction(trans.id))} className="text-red-500 hover:underline">Delete</button>
                  </div>
                </div>
              </li>
            )
          )}
        </ul>
      )
        } 
    </div>
  );
}


export default TransactionList




 