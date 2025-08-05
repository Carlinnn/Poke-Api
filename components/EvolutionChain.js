import React, { useEffect, useState } from 'react';

const nameToId = {};

async function fetchPokemonId(name) {
  if (nameToId[name]) return nameToId[name];
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!res.ok) return null;
  const data = await res.json();
  nameToId[name] = data.id;
  return data.id;
}

function EvolutionNode({ node, onSelect }) {
  const [imgUrl, setImgUrl] = useState('');

  useEffect(() => {
    let isMounted = true;
    fetchPokemonId(node.name).then((id) => {
      if (isMounted && id) {
        setImgUrl(
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
        );
      }
    });
    return () => {
      isMounted = false;
    };
  }, [node.name]);

  return (
    <div className="d-flex align-items-center mb-3 flex-wrap justify-content-center">
      <div
        className="bg-white border border-dark rounded-circle d-flex align-items-center justify-content-center me-2 mb-2"
        style={{ width: 56, height: 56, overflow: 'hidden', flexShrink: 0 }}
      >
        {imgUrl ? (
          <img
            src={imgUrl}
            alt={node.name}
            style={{ width: 48, height: 48, objectFit: 'contain' }}
          />
        ) : (
          <span className="text-muted">...</span>
        )}
      </div>
      <button
        className="btn btn-outline-dark fw-bold mb-2"
        onClick={() => onSelect(node.name)}
        style={{ minWidth: 120, flexShrink: 0 }}
      >
        {node.name.charAt(0).toUpperCase() + node.name.slice(1)}
      </button>
      {node.evolves_to.length > 0 && (
        <div className="ms-4 d-flex flex-wrap gap-2 justify-content-center w-100">
          {node.evolves_to.map((child, idx) => (
            <EvolutionNode key={idx} node={child} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
}

const EvolutionChain = ({ chain, onSelect }) => {
  if (!chain) return null;
  return (
    <div className="mt-4">
      <h5 className="fw-bold text-center mb-2">Evoluções</h5>
      <div className="d-flex flex-wrap justify-content-center w-100">
        <EvolutionNode node={chain.chain} onSelect={onSelect} />
      </div>
    </div>
  );
};

export default EvolutionChain;