import React from 'react';

const CountrySearch = ({ value, onChange }) => {
  return (
    <div>
      Find countries: <input value={value} onChange={onChange} />
    </div>
  );
};

export default CountrySearch;