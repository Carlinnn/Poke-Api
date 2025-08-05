import React from 'react';

const typeColors = {
  normal: 'secondary',
  fire: 'danger',
  water: 'primary',
  electric: 'warning',
  grass: 'success',
  ice: 'info',
  fighting: 'danger',
  poison: 'purple',
  ground: 'brown',
  flying: 'info',
  psychic: 'pink',
  bug: 'success',
  rock: 'dark',
  ghost: 'dark',
  dragon: 'warning',
  dark: 'dark',
  steel: 'secondary',
  fairy: 'pink',
};

const PokemonCard = ({ pokemon }) => {
  if (!pokemon) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: 400 }}>
        <div className="text-secondary fs-4">Busque um Pokémon pelo nome ou número.</div>
      </div>
    );
  }

  const abilities = pokemon.raw.abilities.map(a => ({
    name: a.ability.name,
    isHidden: a.is_hidden,
  }));
  const stats = pokemon.raw.stats.map(s => ({
    name: s.stat.name,
    value: s.base_stat,
  }));
  const moves = pokemon.raw.moves?.slice(0, 20) || [];
  const heldItems = pokemon.raw.held_items.map(i => ({
    name: i.item.name,
    versions: i.version_details.map(v => v.version.name),
    rarity: i.version_details.map(v => v.rarity),
  }));

  return (
    <div className="flex-grow-1" style={{ minWidth: 320 }}>
      <div className="card mb-4 border-0 shadow-lg" style={{ maxWidth: 900, background: 'linear-gradient(90deg, #f8fafc 60%, #e0e7ff 100%)', borderRadius: 32 }}>
        <div className="row g-0 align-items-stretch">
          {/* Painel esquerdo */}
          <div className="col-md-4 d-flex flex-column align-items-center justify-content-center p-4" style={{ background: '#eef2ff', borderRadius: '32px 0 0 32px' }}>
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="img-fluid rounded-4 shadow mb-3"
              style={{ width: 130, height: 130, objectFit: 'contain', background: '#f8f9fa', border: '3px solid #e0e7ff' }}
            />
            <h2 className="h3 fw-bold mb-2 text-center" style={{ color: '#6366f1' }}>{pokemon.displayName}</h2>
            <div className="d-flex flex-row flex-wrap gap-2 justify-content-center mb-2">
              {pokemon.types.map(type => (
                <span key={type} className={`badge bg-${typeColors[type] || 'secondary'} text-capitalize px-3 py-2 fs-6 shadow-sm`} style={{ fontWeight: 500 }}>
                  {type}
                </span>
              ))}
            </div>
            <div className="d-flex flex-row flex-wrap gap-2 justify-content-center mb-2">
              <span className="badge bg-info px-3 py-2 fs-6">Exp: {pokemon.raw.base_experience}</span>
              <span className="badge bg-dark px-3 py-2 fs-6">Height: {pokemon.heightMeters}m</span>
              <span className="badge bg-dark px-3 py-2 fs-6">Weight: {pokemon.weightKg}kg</span>
            </div>
            <audio controls src={pokemon.raw.cries?.latest} style={{ width: 100 }}>
              Seu navegador não suporta áudio.
            </audio>
          </div>
          {/* Painel direito */}
          <div className="col-md-8 d-flex flex-column justify-content-center p-4 gap-4" style={{ background: '#f8fafc', borderRadius: '0 32px 32px 0' }}>
            <div className="row g-4">
              <div className="col-md-6">
                <div className="mb-2 text-primary fw-bold">Abilities</div>
                <div className="d-flex flex-row flex-wrap gap-2 mt-1">
                  {abilities.map((a, idx) => (
                    <span key={idx} className={`badge ${a.isHidden ? 'bg-warning text-dark' : 'bg-success'} text-capitalize px-3 py-2 shadow-sm`} style={{ fontWeight: 500 }}>
                      {a.name} {a.isHidden ? '(Hidden)' : ''}
                    </span>
                  ))}
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-2 text-primary fw-bold">Stats</div>
                <div className="d-flex flex-row flex-wrap gap-2 mt-1">
                  {stats.map((s, idx) => (
                    <span key={idx} className="badge bg-primary text-capitalize px-3 py-2 shadow-sm" style={{ fontWeight: 500 }}>{s.name}: {s.value}</span>
                  ))}
                </div>
              </div>
            </div>
            {/* Moves encaixados no painel direito */}
            <div className="">
              <div className="mb-2 text-primary fw-bold">Moves</div>
              <div className="d-flex flex-row flex-wrap gap-2 mt-1" style={{ maxHeight: 180, overflowY: 'auto' }}>
                {moves.length === 0 ? (
                  <span className="text-muted">Nenhum move encontrado.</span>
                ) : (
                  moves.map((m, idx) => (
                    <span key={idx} className="badge bg-warning text-dark px-3 py-2 shadow-sm text-capitalize" style={{ fontWeight: 500 }}>
                      {m.move.name.replace('-', ' ')}
                    </span>
                  ))
                )}
              </div>
            </div>
            {heldItems.length > 0 && (
              <div className="">
                <div className="mb-2 text-primary fw-bold">Held Items</div>
                <div className="d-flex flex-row flex-wrap gap-2 mt-1">
                  {heldItems.map((item, idx) => (
                    <div key={idx} className="border rounded-3 p-2 bg-light shadow-sm" style={{ minWidth: 120 }}>
                      <span className="fw-bold text-capitalize">{item.name}</span>
                      <br />
                      <span className="small text-muted">Versions: {item.versions.join(', ')}</span>
                      <br />
                      <span className="small text-muted">Rarity: {item.rarity.join(', ')}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="">
              <div className="mb-2 text-primary fw-bold">Forms</div>
              <div className="d-flex flex-row flex-wrap gap-2 mt-1">
                {pokemon.raw.forms.map((f, idx) => (
                  <span key={idx} className="badge bg-secondary text-capitalize px-3 py-2 shadow-sm" style={{ fontWeight: 500 }}>{f.name}</span>
                ))}
              </div>
            </div>
            <div className="">
              <div className="mb-2 text-primary fw-bold">Game Indices</div>
              <div className="d-flex flex-row flex-wrap gap-2 mt-1">
                {pokemon.raw.game_indices.map((g, idx) => (
                  <span key={idx} className="badge bg-light text-dark text-capitalize px-3 py-2 shadow-sm" style={{ fontWeight: 500 }}>{g.version.name}: {g.game_index}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Evoluções (exemplo de como encaixar abaixo do card principal) */}
      {/* <EvolutionChain ... /> */}
    </div>
  );
};

export default PokemonCard;