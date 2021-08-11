import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfig } from '../app-config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: AppConfig) => ({
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
        entities: ['dist/**/*.entity{ .ts,.js}'],
        synchronize: false,
        autoLoadEntities: true,
        migrations: ['dist/migration/*{.ts,.js}'],
        migrationsRun: true,
        migrationsTableName: 'migration',
        logging: false,
      }),
      inject: [AppConfig],
    }),
  ],
})
export class DatabaseModule {}
