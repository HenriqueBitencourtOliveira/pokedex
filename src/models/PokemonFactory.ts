import { Pokemon } from "./returnType";

// Definindo uma classe auxiliar para criar objetos Pokemon
export class PokemonFactory {
    static create(detailsData: any): Pokemon {
      return {
        height: detailsData.height,
        id: detailsData.id,
        name: detailsData.name,
        types: detailsData.types,
        stats: detailsData.stats,
        // Adicione outras propriedades, se necessário
      };
    }
  }
  