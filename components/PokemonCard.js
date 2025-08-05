import React from 'react';

const PokemonCard = ({ pokemon }) => {
  if (!pokemon) {
    return <div className="text-secondary">Busque um Pokémon pelo nome ou número.</div>;
  }

  return (
    <div className="text-center">
      <img
        src={pokemon.image}
        alt={pokemon.name}
        className="img-thumbnail mb-2"
        style={{ width: 128, height: 128 }}
      />
      <h2 className="h4 fw-bold mb-1">{pokemon.displayName}</h2>
      <div className="text-muted">
        <div>Type: {pokemon.typeString}</div>
        <div>Height: {pokemon.heightMeters} m</div>
        <div>Weight: {pokemon.weightKg} kg</div>
      </div>
    </div>
  );
};

export default PokemonCard;