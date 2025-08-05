import Pokemon from '../models/Pokemon';
import EvolutionChain from '../models/EvolutionChain';

export async function fetchPokemon(query) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
    if (!res.ok) return null;
    const data = await res.json();
    return new Pokemon(data);
  } catch {
    return null;
  }
}

export async function fetchEvolutionChain(pokemonSpeciesUrl) {
  try {
    // Get species info to find evolution chain URL
    const speciesRes = await fetch(pokemonSpeciesUrl);
    if (!speciesRes.ok) return null;
    const speciesData = await speciesRes.json();
    const evoUrl = speciesData.evolution_chain.url;
    const evoRes = await fetch(evoUrl);
    if (!evoRes.ok) return null;
    const evoData = await evoRes.json();
    return new EvolutionChain(evoData);
  } catch {
    return null;
  }
}