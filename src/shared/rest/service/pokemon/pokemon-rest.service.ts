import { Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { IPokemon } from './model';
import { BaseRestService } from '../base-rest.service';

@Injectable()
export class PokemonRestService extends BaseRestService {
  protected get apiUrl(): string {
    return `https://pokeapi.co/api/v2/pokemon`;
  }

  public constructor(httpService: HttpService) {
    super(httpService);
  }

  getPokemon(id: string): Promise<IPokemon> {
    return lastValueFrom(this.get(`/${id}`).pipe(map((res: IPokemon) => res)));
  }
}
