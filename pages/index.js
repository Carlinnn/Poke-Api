import Head from 'next/head';
import { useState } from 'react';
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

  const handleSearch = async (e) => {
    e.preventDefault();
    setShowMoves(false);
    setMoves([]);
    if (!query) return;
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
  };

  const handleEvolutionSelect = async (name) => {
    setShowMoves(false);
    setMoves([]);
    setQuery(name);
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
  };

  return (
    <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center">
      <Head>
        <title>Pokédex</title>
        <meta name="description" content="Pokédex com Bootstrap" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="card shadow-lg p-4" style={{ maxWidth: 1000, width: '100%' }}>
        <h1 className="display-5 fw-bold text-center mb-4">Pokédex</h1>
        <SearchBar
          value={query}
          onChange={e => setQuery(e.target.value)}
          onSubmit={handleSearch}
        />
        <div className="d-flex flex-column flex-md-row gap-4 align-items-stretch justify-content-center w-100 mt-3">
          <div className="flex-grow-1" style={{ minWidth: 320 }}>
            <PokemonCard pokemon={pokemon} />
            <EvolutionChain chain={evolutionChain} onSelect={handleEvolutionSelect} />
          </div>
          {/* MovesCard removido. Moves agora aparecem integradas ao PokemonCard. */}
        </div>
      </div>
    </div>
  );
};

export default Home;