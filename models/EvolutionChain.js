export default class EvolutionChain {
  constructor(data) {
    this.id = data.id;
    this.chain = this.parseChain(data.chain);
  }

  // Recursively parse the evolution chain
  parseChain(chainLink) {
    const species = {
      name: chainLink.species.name,
      url: chainLink.species.url,
      is_baby: chainLink.is_baby,
      evolves_to: [],
      details: chainLink.evolution_details,
    };
    if (chainLink.evolves_to && chainLink.evolves_to.length > 0) {
      species.evolves_to = chainLink.evolves_to.map(e => this.parseChain(e));
    }
    return species;
  }
}