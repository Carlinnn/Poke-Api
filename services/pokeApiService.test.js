import { fetchPokemon, fetchEvolutionChain, fetchMoves } from './pokeApiService';

describe('pokeApiService', () => {
  test('fetchPokemon retorna dados de um Pokémon válido', async () => {
    const result = await fetchPokemon('pikachu');
    expect(result).toBeDefined();
    expect(result.raw.name).toBe('pikachu');
    expect(result.id).toBeGreaterThan(0);
  });

  test('fetchPokemon retorna null para Pokémon inválido', async () => {
    const result = await fetchPokemon('pokemon-invalido-xyz');
    expect(result).toBeNull();
  });

  test('fetchEvolutionChain retorna cadeia de evolução válida', async () => {
    // Usando id do Pikachu
    const speciesUrl = 'https://pokeapi.co/api/v2/pokemon-species/25/';
    const chain = await fetchEvolutionChain(speciesUrl);
    expect(chain).toBeDefined();
    expect(chain.length).toBeGreaterThan(0);
  });

  test('fetchMoves retorna lista de moves válidos', async () => {
    const moves = await fetchMoves(['thunder-shock', 'quick-attack']);
    expect(moves).toBeDefined();
    expect(moves.length).toBe(2);
    expect(moves[0].move.name).toBe('thunder-shock');
  });
});
