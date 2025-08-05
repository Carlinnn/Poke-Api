import React from 'react';

const PokedexLayout = ({ children }) => (
  <main className="container p-4 border border-dark rounded bg-white shadow" style={{ maxWidth: 400 }}>
    <h1 className="display-5 fw-bold text-center mb-4">Pokédex</h1>
    {children}
  </main>
);

export default PokedexLayout;