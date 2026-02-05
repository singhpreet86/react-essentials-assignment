import React from "react";

const Filters = ({ filters, updateFilter, clearFilters, categories, getFilterSummary, sortBy, sortOrder, setSortBy, setSortOrder }) => {
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


          <div className="form-group">
            <label>Sort By</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="date">Date</option>
              <option value="amount">Amount</option>
              <option value="category">Category</option>
            </select>
          </div>

          <div className="form-group">
            <label>Order</label>
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>


      {getFilterSummary().hasActiveFilters && (
        <div className='form-group'>
          <label>Clear Filter</label>

          <button className=" filter-button"
            onClick={clearFilters}
          >

            Reset </button>
        </div>
      )}

    </div>
  );
};

export default Filters;
