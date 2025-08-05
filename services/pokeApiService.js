import Pokemon from '../models/Pokemon';

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