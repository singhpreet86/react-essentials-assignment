import React, { useState, useEffect } from 'react';
import './index.css';
import useExpenses from './hooks/useExpenses';
import useFilters from './hooks/useFilters';
import ExpenseForm from './components/ExpenseForm';
import Filters from './components/Filters';
import ExpenseList from './components/ExpenseList';
import Summary from './components/Summary';

function App() {

  const { expences, addExpense, removeExpense, getTotalAmount, getExpensesByCategory } = useExpenses();
  const {
    filters,
    updateFilter,
    clearFilters,
    filteredData: filteredExpenses,
    getFilterSummary
  } = useFilters(expences);


  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('food');


  const categories = ['all', 'food', 'transport', 'entertainment', 'bills', 'shopping', 'others'];

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
          getFilterSummary={getFilterSummary} />
      </section>

      <section className="card expense-list-card">
        <ExpenseList
          filteredExpenses={filteredExpenses}
          removeExpense={removeExpense} />  
      </section>
     
      <section className="card total-section">
        <Summary 
          getTotalAmount={getTotalAmount} 
          getFilterSummary={getFilterSummary}
          filteredExpenses={filteredExpenses}
          />
      </section>
    </div>
  )
}

export default App;
