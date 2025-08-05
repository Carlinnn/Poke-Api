import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import SearchBar from '../components/SearchBar';
import PokemonCard from '../components/PokemonCard';
import EvolutionChain from '../components/EvolutionChain';
import { fetchPokemon, fetchEvolutionChain, fetchMoves } from '../services/pokeApiService';


const Home = () => {
  const [query, setQuery] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState(null);
  const [showMoves, setShowMoves] = useState(false);
  const [moves, setMoves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pokemonNames, setPokemonNames] = useState([]);
  const [showFavs, setShowFavs] = useState(false);
  const [favorites, setFavorites] = useState([]);

  // Buscar lista de nomes de Pokémon ao carregar a página
  useEffect(() => {
    async function fetchNames() {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10000');
        const data = await res.json();
        setPokemonNames(data.results.map(p => p.name));
      } catch (err) {
        setPokemonNames([]);
      }
    }
    fetchNames();
    // Carregar favoritos do localStorage
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(favs);
  }, []);

  // Atualizar favoritos ao favoritar/desfavoritar
  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(favs);
  }, [pokemon]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setShowMoves(false);
    setMoves([]);
    if (!query) return;
    setLoading(true);
    const result = await fetchPokemon(query);
    setPokemon(result);

    if (result) {
      const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${result.id}/`;
      const evoChain = await fetchEvolutionChain(speciesUrl);
      setEvolutionChain(evoChain);

      // Carregar moves automaticamente
      const moveNames = result.raw.moves.slice(0, 20).map(m => m.move.name);
      const movesData = await fetchMoves(moveNames);
      setMoves(movesData);
      setShowMoves(true);
    } else {
      setEvolutionChain(null);
      setMoves([]);
      setShowMoves(false);
    }
    setLoading(false);
  };

  const handleEvolutionSelect = async (name) => {
    setShowMoves(false);
    setMoves([]);
    setQuery(name);
    setLoading(true);
    const result = await fetchPokemon(name);
    setPokemon(result);

    if (result) {
      const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${result.id}/`;
      const evoChain = await fetchEvolutionChain(speciesUrl);
      setEvolutionChain(evoChain);

      // Carregar moves automaticamente
      const moveNames = result.raw.moves.slice(0, 20).map(m => m.move.name);
      const movesData = await fetchMoves(moveNames);
      setMoves(movesData);
      setShowMoves(true);
    } else {
      setEvolutionChain(null);
      setMoves([]);
      setShowMoves(false);
    }
    setLoading(false);
  };

  return (
    <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center">
      <Head>
        <title>Pokédex</title>
        <meta name="description" content="Pokédex com Bootstrap" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="card shadow-lg p-4" style={{ maxWidth: 1000, width: '100%', borderRadius: 24 }} role="main" aria-label="Área principal da Pokédex">
        <div className="row align-items-center mb-4" role="banner">
          <div className="col-12 col-md-8 text-center text-md-start mb-2 mb-md-0">
            <h1 className="display-5 fw-bold mb-0" style={{ wordBreak: 'break-word' }}>Pokédex</h1>
          </div>
          <div className="col-12 col-md-4 text-center text-md-end">
            <button
              type="button"
              className="btn btn-outline-warning"
              style={{ fontWeight: 600, minWidth: 120 }}
              onClick={() => setShowFavs(true)}
              aria-label="Ver Pokémon favoritos"
              tabIndex={0}
            >
              <span role="img" aria-label="Favoritos" style={{ fontSize: 24, marginRight: 8 }}>★</span>
              Favoritos
            </button>
          </div>
        </div>
        <div className="row justify-content-center mb-3">
          <div className="col-12 col-md-6">
            <SearchBar
              value={query}
              onChange={e => setQuery(e.target.value)}
              onSubmit={handleSearch}
              suggestions={pokemonNames}
            />
          </div>
        </div>
        {loading ? (
          <div className="d-flex justify-content-center align-items-center w-100" style={{ minHeight: 300 }}>
            <div className="spinner-border text-primary" role="status" aria-label="Carregando">
              <span className="visually-hidden">Carregando...</span>
            </div>
          </div>
        ) : (
          <div className="row justify-content-center mt-3">
            <div className="col-12 col-md-8 fade-in">
              <PokemonCard pokemon={pokemon} />
              <EvolutionChain chain={evolutionChain} onSelect={handleEvolutionSelect} />
            </div>
          </div>
        )}
        {/* Modal de favoritos */}
        {showFavs && (
          <div className="modal fade show" style={{ display: 'block', background: 'rgba(0,0,0,0.3)' }} tabIndex="-1" role="dialog" aria-modal="true" aria-labelledby="modal-favoritos">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="modal-favoritos">Pokémon Favoritos</h5>
                  <button type="button" className="btn-close" aria-label="Fechar modal de favoritos" onClick={() => setShowFavs(false)} tabIndex={0}></button>
                </div>
                <div className="modal-body">
                  {favorites.length === 0 ? (
                    <div className="text-muted">Nenhum Pokémon favoritado.</div>
                  ) : (
                    <ul className="list-group" role="list" aria-label="Lista de Pokémon favoritos">
                      {favorites.map(name => (
                        <li key={name} className="list-group-item d-flex justify-content-between align-items-center" role="listitem">
                          <span className="text-capitalize">{name}</span>
                          <button className="btn btn-sm btn-primary" onClick={() => { setQuery(name); setShowFavs(false); handleSearch({ preventDefault: () => {} }); }} aria-label={`Ver detalhes de ${name}`} tabIndex={0}>Ver</button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;