import React from 'react';

const SearchBar = ({ value, onChange, onSubmit }) => (
  <form onSubmit={onSubmit} className="mb-4">
    <input
      type="text"
      placeholder="Name or Number"
      value={value}
      onChange={onChange}
      className="form-control"
    />
  </form>
);

export default SearchBar;