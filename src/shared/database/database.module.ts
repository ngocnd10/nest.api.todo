import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfig } from '../app-config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService) => ({
        type: 'postgres',
        replication: {
          master: {
            host: configService.get('db.postgres.write.host'),
            port: +configService.get('db.postgres.write.port'),
            username: configService.get('db.postgres.write.user'),
            password: configService.get('db.postgres.write.password'),
            database: configService.get('db.postgres.write.database'),
          },
          slaves: [
            {
              host: configService.get('db.postgres.write.host'),
              port: +configService.get('db.postgres.write.port'),
              username: configService.get('db.postgres.write.user'),
              password: configService.get('db.postgres.write.password'),
              database: configService.get('db.postgres.write.database'),
            },
          ],
        },
        schema: configService.get('db.postgres.schema'),
        // entities: [__dirname + '/../**/*.entity.ts'],
        synchronize: false,
        // autoLoadEntities: true,
        // migrationsRun: configService.get('db.postgres.migrationsRun'),
        // migrationsTableName: 'migration',
      }),
      inject: [AppConfig],
    }),
  ],
})
export class DatabaseModule {}
