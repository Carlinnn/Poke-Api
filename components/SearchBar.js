import React, { useState, useRef } from 'react';

const SearchBar = ({ value, onChange, onSubmit, suggestions = [] }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const inputRef = useRef(null);

  // Filtrar sugestões conforme digita
  const handleChange = (e) => {
    onChange(e);
    const val = e.target.value.toLowerCase();
    if (val.length > 0) {
      const match = suggestions.filter(s => s.toLowerCase().includes(val)).slice(0, 8);
      setFiltered(match);
      setShowDropdown(match.length > 0);
    } else {
      setFiltered([]);
      setShowDropdown(false);
    }
  };

  // Selecionar sugestão
  const handleSelect = (name) => {
    onChange({ target: { value: name } });
    setShowDropdown(false);
    inputRef.current.focus();
  };

  // Fechar dropdown ao perder foco
  const handleBlur = () => {
    setTimeout(() => setShowDropdown(false), 100);
  };

  return (
    <form onSubmit={onSubmit} className="mb-4 position-relative" autoComplete="off" role="search" aria-label="Buscar Pokémon">
      <input
        type="text"
        placeholder="Name or Number"
        value={value}
        onChange={handleChange}
        className="form-control"
        ref={inputRef}
        onBlur={handleBlur}
        aria-label="Campo de busca de Pokémon"
      />
      {showDropdown && (
        <ul className="list-group position-absolute w-100 shadow" style={{ zIndex: 10, top: '100%' }} role="listbox" aria-label="Sugestões de Pokémon">
          {filtered.map(name => (
            <li
              key={name}
              className="list-group-item list-group-item-action"
              style={{ cursor: 'pointer' }}
              onMouseDown={() => handleSelect(name)}
              tabIndex={0}
              role="option"
              aria-selected={false}
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default SearchBar;