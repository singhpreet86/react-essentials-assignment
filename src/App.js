/* cusomer hooks, personal expence tracker 

psychology of custom hooks 
the art of logoc extraction
state management patterns
data presistence magic
real work architecture 


Why expences -> ( expences, categories, filters) 
local storage( saving/loading data)
calculation logic
form handling




state complexity
data relationships
real world persisence
busiines login
practical value


Custom hooks ->
  starts with use
  can call other hooks
  return vaues that component can use
  encapsulate logic

*/

//In below functions we have duplicated code for fetching user data

// const UserProfile = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null); 

//   useEffect(() => {
//     fetchUser()
//     .then(setUser)
//     .then(setError)
//     .finally(() => setLoading(false));
//   }, []);

  
// }

// const UserSettings = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null); 

//   useEffect(() => {
//     fetchUser()
//     .then(setUser)
//     .then(setError)
//     .finally(() => setLoading(false));
//   }, []);

  
// }

//In above functions we have duplicated code for fetching user data


//We can extract this logic into a custom hook
// const useUserData = () => { 

//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null); 

//   useEffect(() => {
//     fetchUser()
//     .then(setUser)
//     .then(setError)
//     .finally(() => setLoading(false));
//   }, []);
//   return {user, loading, error};
// }

// const UserProfile = () => {
//   const {user, loading, error} = useUserData();
// }

// const UserSetting = () => {
//   const {user, loading, error} = useUserData();
// }


/* always start with use
only call at the top level
only call from react functions
keep them focused
can call other hooks
return values that component can use
encapsulate logic


when to use custom hooks
- you are copying useState and useEffect logic across multiple components
  A component has more than 2.4 useState calls
  your useEffect logic is complex and involves multiple steps
  you want to share logic between components without repeating code
  you want to abstract away complex logic for better readability
  local storage or session storage management
  form handling and validation
  data fetching and caching
  authentication and authorization
  theming and styling management
  performance optimizations like debouncing or throttling
  real-time data handling with websockets or subscriptions
*/


/* local stoage

Synchronizing API
string storage only
domain specific
5-10 MB storage limit

*/
// exaples of local storage usage

/*
localStorage.setItem('key','value'); //store data
cost value = localStorage.getItem('key'); //retrieve data

localStorage.removeItem('key'); //delete data

localStorage.clear(); //clear all data
*/

import React, {useState, useEffect} from 'react';
import './index.css';
import useExpenses from './hooks/useExpenses';
import useFilters from './hooks/useFilters';

function App() {

const {expences, addExpense, removeExpense, getTotalAmount, getExpensesByCategory} = useExpenses();
const {
  filters,
   updateFilter, 
   clearFilters, 
   filteredData: filteredExpenses,
   getFilterSummary
   }   = useFilters(expences);


//  const[expences, Setexpences] = useState([]);  moved to custom hooks
 const [description, setDescription] = useState('');
 const[amount, setAmount] = useState('');
 const[category, setCategory] = useState('food');


 const categories = ['all', 'food', 'transport','entertainment','bills', 'shopping','others'];

 const handleSubmit = (e) => {
    e.preventDefault();

  if(!description.trim() || !amount){
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

  
  //commented to use the custom hooks
  // const addExpense = (e) => {
  //   e.preventDefault();

  // if(!description.trim() || !amount){
  //   return;
  // }

  // const newExpense = {
  //   id: Date.now(),
  //   description: description.trim(),
  //   amount: parseFloat(amount),
  //   category,
  //   date: new Date().toISOString().split('T')[0]
  // };

  // Setexpences([newExpense, ...expences]);
  // setDescription('');
  // setAmount('');
  // };

  // const totalAmount = expences.reduce((sum,expences) => sum+expences.amount,0);



  return (
    <div className="App">
      <h1> Pessonale Expense Tracker </h1>

      <form className='expense-form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label> Description </label>
          <input 
           type='text'
           value={description}
           onChange={(e) => setDescription(e.target.value)}
           placeholder='What did you spend on'
           required
           />
        </div>

        <div className='form-group'>
          <label> Amount </label>
          <input 
           type='number'
           step='0.1'
           value={amount}
           onChange={(e) => setAmount(e.target.value)}
           placeholder='0.00'
           required
           />
        </div>

        <div className='form-group'>
          <label> Category </label>
          <select value={category}
           onChange={(e) => setCategory(e.target.value)}>

            { categories.slice(1).map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase()+cat.slice(1)}
              </option>
            ))}
            </select>
        </div>

        <button type='submit'>Add Expenses</button>

      </form>

      <div className='filters'>
        <div className='form-group'>
          <label> Filter by Category </label>
          <select 
          value={filters.category}
          onChange={(e) => updateFilter('category', e.target.value)}>
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat == 'all' ? "All Categories" : cat.charAt(0).toUpperCase()+cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className='form-group'>
          <label> Search Description </label>
          <input 
           type='text'
           value={filters.searchTerm}
           onChange={(e) => updateFilter('searchTerm', e.target.value)}
           placeholder='Search expenses...'
           />
        </div>

        <div className='form-group'>
          <label> Min Amount </label>
          <input 
           type='number'
           step='0.01'
           value={filters.minAmount}
           onChange={(e) => updateFilter('minAmount', e.target.value)}
           placeholder='0.00'
           />
        </div>
    
            <div className='form-group'>
          <label> Max Amount </label>
          <input 
           type='number'
           step='0.01'
           value={filters.maxAmount}
           onChange={(e) => updateFilter('maxAmount', e.target.value)}
           placeholder='999.99'
           />
        </div>

        {getFilterSummary().hasActiveFilters && (
            <button 
              type="button"
            onClick={clearFilters} 
            style={{background: '#6c757d'}}>
              
               Clear Filters({getFilterSummary.count}) </button>
        )}
            

        <div style={{marginTop: '20px 0', padding: '10px',background: '#f8f9fa', borderRadius: '8px'}}>
          <p> Showing {getFilterSummary().totalResults} results </p>
          {getFilterSummary().hasActiveFilters && `(${getFilterSummary.activeCount} filter ${getFilterSummary.activeCount !=='1' ? 's' : ''} active)` }

        </div>
      </div>
      <div className='expense-list'>
        {filteredExpenses.length === 0 ? (
          <p style={{textAlign: 'center', color: '#666', fontStyle: 'italic'}}> 
          {
            filteredExpenses.length > 0 ? 
          "No Expense yet, Add your first expense above!" : 
          "No expenses match the current filters. Try adjusting your filter criteria."
          }
          </p>

        ): (
          filteredExpenses.map(expense => (
            <div key={expense.id} className='expense-item'>
             <div className='expense-info'>
              <div className='expense-description'>{expense.description} </div>
              <div className='expense-category'>{expense.category} </div>
              <div style={{color: '#666', fontSize: '14px'}}>{expense.date} </div>
              </div>  

              <div className='expense-amount'> ${expense.amount.toFixed(2)} </div> 
              <button onClick={() => removeExpense(expense.id)}
              style={{background: '#e53e3e', padding: '5px 10px', fontSize: '12px'}}>Delete</button>
            </div>  
          ))
        )} 
      </div>

      <div className='total-section'>
        <h2> Total Expenses </h2>
        <div className='total-amount'> ${getTotalAmount.toFixed(2)}</div>
        {getFilterSummary.hasActiveFilters && (
          <div style={{fontSize: '16px', color: '#666', marginTop: '10px'}}>
            (Filtered Total: ${filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0).toFixed(2)})
          </div>
        )}
      </div>    
  </div>
  )
}

export default App;
