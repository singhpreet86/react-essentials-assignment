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
            <label> From Date </label>
            <input
              type='date'
              value={filters.dateFrom}
              onChange={(e) => updateFilter('dateFrom', e.target.value)}
            />
          </div>

          <div className='form-group'>
            <label> To Date </label>
            <input
              type='date'
              value={filters.dateTo}
              onChange={(e) => updateFilter('dateTo', e.target.value)}
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
