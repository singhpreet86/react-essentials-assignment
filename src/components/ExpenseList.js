import React from "react";
import { useState } from "react";

const ExpenseList = ({ filteredExpenses, removeExpense, getTotalAmount }) => {

  const [showDelete, setShowDelete] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalDescription, setModalDescription] = useState('');

  const DeleteConirmation = ({ onConfirm, onCancel }) => {
    return (
      <div className="modal-overlay">
        <div className="modal">
          <h3>Confirm Delete </h3>
          <p> Are you sure you want to delete this expense ?</p>
          <div className="modal-actions">
            <button onClick={onConfirm} style={{ background: "#c62828" }}> Delete </button>
            <button onClick={onCancel}>Cancel</button>
          </div>

        </div>
      </div>
    );
  };

  const showDescriptionModal = (description) => {
    return (
      <div className="modal-overlay">
        <div className="modal">
          <h3>Expense Description</h3>
          <p>{description}</p>
          <div className="modal-actions">
            <button onClick={() => {             
              setShowModal(false);
            }}>Close</button>
          </div>

        </div>
      </div>
    )
  }


  return (
    <div className='expense-list'>
      {filteredExpenses.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666', fontStyle: 'italic', margin: '20px' }}>
          {
            getTotalAmount === 0 ?
              "No Expense yet, Add your first expense above!" :
              "No expenses match the current filters. Try adjusting your filter criteria."
          }
        </p>

      ) : (
        filteredExpenses.map(expense => (
          <div key={expense.id} className='expense-item'>
            <div className='expense-info'>

              <div
                className="expense-description"
                onClick={(e) => {
                  if (e.currentTarget.scrollHeight > e.currentTarget.clientHeight) {
                    showDescriptionModal(expense.description);
                    setShowModal(true);
                    setModalDescription(expense.description);
                  }
                }}
              >
                {expense.description}
              </div>

              <div className='expense-category'>{expense.category} </div>
              <div style={{ color: '#666', fontSize: '14px' }}>{expense.date} </div>
            </div>

            <div className="expense-right">
              <div className='expense-amount'>
                <span className="currency">$</span>
                <span className="amount">{expense.amount.toFixed(2)}</span>
              </div>

              <button style={{ background: '#e53e3e', padding: '5px 10px', fontSize: '12px' }} onClick={() => { setShowDelete(true); setExpenseToDelete(expense.id); }}>Delete</button>

            </div>
          </div>


        ))
      )}

      {showDelete && (
        <DeleteConirmation
          onConfirm={() => { removeExpense(expenseToDelete); setShowDelete(false) }}
          onCancel={() => setShowDelete(false)} />
      )}

      {showModal && (
        showDescriptionModal(modalDescription)
      )}
    </div>
  );
};

export default ExpenseList;
