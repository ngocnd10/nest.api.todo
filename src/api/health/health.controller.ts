import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  MicroserviceHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus/index';
import { IgnoreTransformInterceptor } from '@common/interceptor';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { Transport } from '@nestjs/microservices';
import { AppConfig } from '@shared/app-config';

@ApiTags('health')
@Controller('health')
export class HealthController {
  private redisUrl: string;

  constructor(
    private appConfig: AppConfig,
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    private microservice: MicroserviceHealthIndicator,
  ) {
    const redisHost = appConfig.get('redis.host');
    const redisPort = appConfig.get('redis.port');
    this.redisUrl = `redis://${redisHost}:${redisPort}`;
  }

  @Get()
  @HealthCheck()
  @IgnoreTransformInterceptor()
  @ApiExcludeEndpoint()
  check() {
    return this.health.check([
      () => this.db.pingCheck('database'),
      async () =>
        this.microservice.pingCheck('redis', {
          transport: Transport.REDIS,
          options: {
            url: this.redisUrl,
          },
        }),
    ]);
  }
}
