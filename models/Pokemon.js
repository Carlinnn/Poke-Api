export default class Pokemon {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.image = data.sprites?.front_default;
    this.types = data.types?.map(t => t.type.name) || [];
    this.height = data.height;
    this.weight = data.weight;
    this.raw = data; // Adicione isso para acessar moves
  }

  get displayName() {
    return `${this.id} - ${this.name.charAt(0).toUpperCase() + this.name.slice(1)}`;
  }

  get typeString() {
    return this.types.join(', ');
  }

  get heightMeters() {
    return this.height / 10;
  }

  get weightKg() {
    return this.weight / 10;
  }
}