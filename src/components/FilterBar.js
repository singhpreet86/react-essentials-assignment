import React from "react";

class FilterBar extends React.Component {

  render() {
    const { statuses, activeFilter, sortOrder, onSortChange, onFilterChange, studentsCount } = this.props;
    return (
      <div className='filter-sort-bar'>
        <div className='filter-sections'>
          <div className='filter-buttons'>
            {statuses.map(status =>
              <button key={status} className={`filter-button ${activeFilter === status ? 'active' : ''}`} onClick={() => onFilterChange(status)}>
                {status}
              </button>
            )}
          </div>
        </div>
        <h2> Student List ({studentsCount})</h2>
        <div className='filter-sections'>
          <select 
            className='sort-select'
            value={sortOrder}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="DESC">DESC</option>
            <option value="ASC">ASC</option>
          </select>
        </div>
      </div>
    )
  }
}

export default FilterBar;
