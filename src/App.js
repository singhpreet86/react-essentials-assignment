import React, { useState, useMemo } from 'react';
import './index.css';
import useExpenses from './hooks/useExpenses';
import useFilters from './hooks/useFilters';
import ExpenseForm from './components/ExpenseForm';
import Filters from './components/Filters';
import ExpenseList from './components/ExpenseList';
import Summary from './components/Summary';

function App() {

  const { expences, addExpense, removeExpense, getTotalAmount, getMonthlySummary} = useExpenses();
  const {
    filters,
    updateFilter,
    clearFilters,
    filteredData: filteredExpenses,
    getFilterSummary,
  } = useFilters(expences);


  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('food');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const categories = ['all', 'food', 'transport', 'entertainment', 'bills', 'shopping', 'others'];

  const sortedExpenses = useMemo(() => {
  const sorted = [...filteredExpenses];

  sorted.sort((a, b) => {
    let valA = a[sortBy];
    let valB = b[sortBy];

    if (sortBy === 'date') {
      valA = new Date(valA);
      valB = new Date(valB);
    }

    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  return sorted;
}, [filteredExpenses, sortBy, sortOrder]);


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description.trim() || !amount) {
      return;
    }

    addExpense({
      description: description.trim(),
      amount: parseFloat(amount),
      category
    });
    setDescription('');
    setAmount('');

  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Personal Expense Tracker</h1>
        <p className="subtitle">Track, filter, and control your spending</p>
      </header>

    <section className="card expense-form-card">
     <ExpenseForm 
      description={description} 
      setDescription={setDescription} 
      amount={amount} 
      setAmount={setAmount} 
      category={category} 
      setCategory={setCategory} 
      handleSubmit={handleSubmit} 
      categories={categories} /> 
     </section>

      <section className="card filters-card">
        <Filters
          filters={filters}
          updateFilter={updateFilter}
          clearFilters={clearFilters}
          categories={categories} 
          getFilterSummary={getFilterSummary} 
          sortBy={sortBy}
          sortOrder={sortOrder}
          setSortBy={setSortBy}
          setSortOrder={setSortOrder}/>
      </section>

      
      <section className="card expense-list-card">
        <ExpenseList
          filteredExpenses={sortedExpenses}
          removeExpense={removeExpense} 
          getTotalAmount={getTotalAmount}
          />  
      </section>
     
      <section className="card total-section">
       {console.log("Monthly Summary:", getMonthlySummary)}

        <Summary 
          getTotalAmount={getTotalAmount} 
          getFilterSummary={getFilterSummary}
          filteredExpenses={sortedExpenses}
          getMonthlySummary={getMonthlySummary}
          />
      </section>
    </div>
  )
}

export default App;
