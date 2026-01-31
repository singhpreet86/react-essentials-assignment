import React from "react";

const Filters = ({ filters, updateFilter, clearFilters, categories, getFilterSummary }) => {
    return (
                <div className='filters'>
          <div className='form-group'>
            <label> Filter by Category </label>
            <select
              value={filters.category}
              onChange={(e) => updateFilter('category', e.target.value)}>
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat == 'all' ? "All Categories" : cat.charAt(0).toUpperCase() + cat.slice(1)}
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
            <div className='form-group'>

              <button
                style={{ background: '#e53e3e', padding: '8px 12px', fontSize: '14px', margin: '35px' }}
                onClick={clearFilters}
              >

                Clear Filters </button>
            </div>
          )}



        </div>
    );                                                                             
};

export default Filters;
