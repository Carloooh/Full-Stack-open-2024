import React from 'react';

const Filter = ({ setFilter, setNameFilter }) => {
  const handleNameFilterChange = (event) => {
    const newNameFilter = event.target.value;
    setNameFilter(newNameFilter);
    if (newNameFilter.length === 0) {
      setFilter(false);
    } else {
      setFilter(true);
    }
  };

  return (
    <div>
      filter shown with: <input onChange={handleNameFilterChange} />
    </div>
  );
};

export default Filter;