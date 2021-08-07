import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus/index';
import { IgnoreTransformInterceptor } from '../../common/interceptor';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  @IgnoreTransformInterceptor()
  check() {
    return this.health.check([() => this.db.pingCheck('database')]);
  }
}
