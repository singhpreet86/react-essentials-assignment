import React from "react";

const Summary = ({ getFilterSummary, getTotalAmount, filteredExpenses, getMonthlySummary }) => {
  return (
    <div className='total-section'>
      <div className="total-expences">
      <h2> Total Expenses </h2>
      <div className='total-amount'> ${getTotalAmount.toFixed(2)}</div>
      {getFilterSummary.hasActiveFilters && (
        <div style={{ fontSize: '16px', color: '#EEE', marginTop: '10px' }}>
          (Filtered Total: ${filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0).toFixed(2)})
        </div>
      )}
      </div>
      
      <div className="monthly-summary" >


      <h2>Monthly Summary</h2>


      {Object.entries(getMonthlySummary || {}).length > 0 && (
        Object.entries(getMonthlySummary).map(([month, total]) => (
          <div key={month} style={{ marginBottom: '8px' }}>
            <strong>{month}</strong> → ${total.toFixed(2)}
          </div>
        ))
      )}

      </div>


    </div>


  );
};

export default Summary;
