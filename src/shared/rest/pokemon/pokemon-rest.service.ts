import { Injectable } from '@nestjs/common';
import { BaseRestService } from '@common/rest';
import { lastValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { IPokemon } from '@shared/rest/pokemon/model';
import { AxiosResponse } from 'axios';

@Injectable()
export class PokemonRestService extends BaseRestService {
  protected get apiUrl(): string {
    return `https://pokeapi.co/api/v2/pokemon/1`;
  }

  public constructor(httpService: HttpService) {
    super(httpService);
  }

  getPokemon(): Promise<IPokemon> {
    return lastValueFrom(this.get('').pipe(map((res: AxiosResponse<IPokemon>) => res.data)));
  }
}
