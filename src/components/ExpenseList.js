import React from "react";

const ExpenseList = ({ filteredExpenses, removeExpense }) => {
    return (
         <div className='expense-list'>
        {filteredExpenses.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', fontStyle: 'italic', margin: '20px' }}>
            {
              filteredExpenses.length > 0 ?
                "No Expense yet, Add your first expense above!" :
                "No expenses match the current filters. Try adjusting your filter criteria."
            }
          </p>

        ) : (
          filteredExpenses.map(expense => (
            <div key={expense.id} className='expense-item'>
              <div className='expense-info'>
                <div className='expense-description'>{expense.description} </div>
                <div className='expense-category'>{expense.category} </div>
                <div style={{ color: '#666', fontSize: '14px' }}>{expense.date} </div>
              </div>

            <div className="expense-right">
              <div className='expense-amount'>
            <span className="currency">$</span>
           <span className="amount">{expense.amount.toFixed(2)}</span>
            </div>


              <button onClick={() => removeExpense(expense.id)}
                style={{ background: '#e53e3e', padding: '5px 10px', fontSize: '12px' }}>Delete</button>
                </div>
            </div>
          ))
        )}
      </div>
    );
};

export default ExpenseList;
