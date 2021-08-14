import { Inject } from '@nestjs/common';
import { PokemonRestService } from './service/pokemon';

export class RestClientProxy {
  @Inject() private readonly pokemonRestService: PokemonRestService;

  protected get pokemonRestClient() {
    return this.pokemonRestService;
  }
}
