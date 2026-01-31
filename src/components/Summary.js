import React from "react";

const Summary = ({ getFilterSummary, getTotalAmount, filteredExpenses }) => {
    return (
        <div className='total-section'>
          <h2> Total Expenses </h2>
          <div className='total-amount'> ${getTotalAmount.toFixed(2)}</div>
          {getFilterSummary.hasActiveFilters && (
            <div style={{ fontSize: '16px', color: '#666', marginTop: '10px' }}>
              (Filtered Total: ${filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0).toFixed(2)})
            </div>
          )}
        </div>
    );
};

export default Summary;
