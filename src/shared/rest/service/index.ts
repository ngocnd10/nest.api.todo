import { PokemonRestService } from './pokemon';

export * from './pokemon';
export * from './base-rest.service';

export const restProviders = [PokemonRestService];
