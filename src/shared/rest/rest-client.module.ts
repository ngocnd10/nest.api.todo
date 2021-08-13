import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppConfig } from '@shared/app-config';
import { PokemonRestService } from '@shared/rest/pokemon/pokemon-rest.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: async configService => ({
        timeout: configService.get('http.timeout'),
        maxRedirects: configService.get('http.max-redirects'),
      }),
      inject: [AppConfig],
    }),
  ],
  providers: [PokemonRestService],
  exports: [PokemonRestService],
})
export class RestClientModule {}
