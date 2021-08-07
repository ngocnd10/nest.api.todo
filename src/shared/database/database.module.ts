import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfig } from '../app-config';
import { DatabaseOptions } from './database.interface';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: AppConfig) => ({
        type: 'postgres',
        replication: {
          master: configService.get<DatabaseOptions>('db.postgres.write'),
          slaves: [configService.get<DatabaseOptions>('db.postgres.read')],
        },
        schema: configService.get<string>('db.postgres.schema'),
        // entities: [__dirname + '/../**/*.entity.ts'],
        synchronize: false,
        autoLoadEntities: true,
        // migrationsRun: configService.get('db.postgres.migrationsRun'),
        // migrationsTableName: 'migration',
      }),
      inject: [AppConfig],
    }),
  ],
})
export class DatabaseModule {}
