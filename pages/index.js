import Head from 'next/head';
import { useState } from 'react';
import PokedexLayout from '../components/PokedexLayout';
import SearchBar from '../components/SearchBar';
import PokemonCard from '../components/PokemonCard';
import EvolutionChain from '../components/EvolutionChain';
import { fetchPokemon, fetchEvolutionChain } from '../services/pokeApiService';

const Home = () => {
  const [query, setQuery] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;
    const result = await fetchPokemon(query);
    setPokemon(result);

    if (result) {
      // Get species URL from API
      const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${result.id}/`;
      const evoChain = await fetchEvolutionChain(speciesUrl);
      setEvolutionChain(evoChain);
    } else {
      setEvolutionChain(null);
    }
  };

  const handleEvolutionSelect = async (name) => {
    setQuery(name);
    const result = await fetchPokemon(name);
    setPokemon(result);

    if (result) {
      const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${result.id}/`;
      const evoChain = await fetchEvolutionChain(speciesUrl);
      setEvolutionChain(evoChain);
    } else {
      setEvolutionChain(null);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
      <Head>
        <title>Pokédex Bootstrap</title>
        <meta name="description" content="Pokédex com Bootstrap" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PokedexLayout>
        <SearchBar
          value={query}
          onChange={e => setQuery(e.target.value)}
          onSubmit={handleSearch}
        />
        <PokemonCard pokemon={pokemon} />
        <EvolutionChain chain={evolutionChain} onSelect={handleEvolutionSelect} />
      </PokedexLayout>
    </div>
  );
};

export default Home;