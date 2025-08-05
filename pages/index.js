import Head from 'next/head';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PokedexLayout from '../components/PokedexLayout';
import SearchBar from '../components/SearchBar';
import PokemonCard from '../components/PokemonCard';
import EvolutionChain from '../components/EvolutionChain';
import { fetchMoves, fetchPokemon, fetchEvolutionChain } from '../services/pokeApiService';

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
      <div className="card shadow-lg p-4" style={{ maxWidth: 1000, width: '100%' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="display-5 fw-bold text-center mb-0">Pokédex</h1>
          <button
            type="button"
            className="btn btn-outline-warning ms-2"
            style={{ fontWeight: 600 }}
            onClick={() => setShowFavs(true)}
            aria-label="Ver favoritos"
          >
            <span role="img" aria-label="Favoritos" style={{ fontSize: 24, marginRight: 8 }}>★</span>
            Favoritos
          </button>
        </div>
        <SearchBar
          value={query}
          onChange={e => setQuery(e.target.value)}
          onSubmit={handleSearch}
          suggestions={pokemonNames}
        />
        {loading ? (
          <div className="d-flex justify-content-center align-items-center w-100" style={{ minHeight: 300 }}>
            <div className="spinner-border text-primary" role="status" aria-label="Carregando">
              <span className="visually-hidden">Carregando...</span>
            </div>
          </div>
        ) : (
          <div className="d-flex flex-column flex-md-row gap-4 align-items-stretch justify-content-center w-100 mt-3">
            <div className="flex-grow-1" style={{ minWidth: 320 }}>
              <PokemonCard pokemon={pokemon} />
              <EvolutionChain chain={evolutionChain} onSelect={handleEvolutionSelect} />
            </div>
            {/* MovesCard removido. Moves agora aparecem integradas ao PokemonCard. */}
          </div>
        )}
        {/* Modal de favoritos */}
        {showFavs && (
          <div className="modal fade show" style={{ display: 'block', background: 'rgba(0,0,0,0.3)' }} tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Pokémon Favoritos</h5>
                  <button type="button" className="btn-close" aria-label="Fechar" onClick={() => setShowFavs(false)}></button>
                </div>
                <div className="modal-body">
                  {favorites.length === 0 ? (
                    <div className="text-muted">Nenhum Pokémon favoritado.</div>
                  ) : (
                    <ul className="list-group">
                      {favorites.map(name => (
                        <li key={name} className="list-group-item d-flex justify-content-between align-items-center">
                          <span className="text-capitalize">{name}</span>
                          <button className="btn btn-sm btn-primary" onClick={() => { setQuery(name); setShowFavs(false); handleSearch({ preventDefault: () => {} }); }}>Ver</button>
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
};

export default Home;