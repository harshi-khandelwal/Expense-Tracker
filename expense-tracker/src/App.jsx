import { useState } from 'react'
import AddTransaction from './components/AddTransaction'
import TransactionList from './components/TransactionList'
import './App.css'
import Summary from './components/Summary'
import FilterBar from './components/FilterBar'
import SetBudget from './components/SetBudget'

function App() {
  const [filters, setFilters] = useState({ category: '', date: '' });
  return (
    
    <div className="w-full h-full bg-body">
      <h1 className="text-4xl font-extrabold text-center text-heading mb-6">Expense Tracker</h1>
      <SetBudget/>
      <Summary/>
      <FilterBar onFilter={setFilters}/>
      <AddTransaction />
     <TransactionList filters={filters} />
    </div>
  
  )
}

export default App
