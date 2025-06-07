
import AddTransaction from './components/AddTransaction'
import TransactionList from './components/TransactionList'
import './App.css'
import Summary from './components/Summary'

function App() {


  return (
    
    <div className="w-full h-full bg-body">
      <h1 className="text-4xl font-extrabold text-center text-heading mb-6">Expense Tracker</h1>
      <Summary/>
      <AddTransaction />
      <TransactionList />
    </div>
  
  )
}

export default App
