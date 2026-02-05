import React from "react";
import { useState } from "react";

const ExpenseList = ({ filteredExpenses, removeExpense, getTotalAmount }) => {

  const [showDelete, setShowDelete] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalDescription, setModalDescription] = useState('');
  const [showFullBtn, setShowFullBtn] = useState({});

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
          <h3 style={{ marginBottom: "12px" }}>Expense Description</h3>
          <textarea
          className="modal-textarea"
          value={description}
          readOnly
        />
          <div className="modal-actions">
            <button onClick={() => {
              setShowModal(false);
            }}>Close</button>
          </div>

        </div>
      </div>
    )
  }

  const openDescription = (description) => {
    setShowModal(true);
    setModalDescription(description);
  };



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

                ref={(el) => {
                  if (!el) return;

                  const isOverflowing = el.scrollHeight > el.clientHeight;

                  if (showFullBtn[expense.id] !== isOverflowing) {
                    setShowFullBtn(prev => ({
                      ...prev,
                      [expense.id]: isOverflowing
                    }));
                  }
                }}
              >
                {expense.description}
              </div>

              <div className='expense-category'>{expense.category} </div>
              <div style={{ color: '#666', fontSize: '14px' }}>{expense.date} </div>
            </div>

            <div className="expense-right">
                   {showFullBtn[expense.id] && (
                <button
                  className="show-full-desc dlt-btn"
                  onClick={() => openDescription(expense.description)}
                >
                  <img src="information.png" alt="Show full description" />
                </button>
              )}

              <div className='expense-amount'>
                <span className="currency">$</span>
                <span className="amount">{expense.amount.toFixed(2)}</span>
              </div>

              <button className="dlt-btn" onClick={() => { setShowDelete(true); setExpenseToDelete(expense.id); }}>

                <img src="delete.png" alt="delete" />

              </button>



         
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
