import  react from 'react';

const ExpenseForm = ({ description, setDescription, amount, setAmount, category, setCategory, handleSubmit, categories }) => {
    return (
          
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

              {categories.slice(1).map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <button type='submit'>Add Expenses</button>

        </form>
    );
};

export default ExpenseForm;
