import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto';
import { IgnoreTransformInterceptor } from '@common/interceptor';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @IgnoreTransformInterceptor()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login', description: 'Login' })
  @ApiOkResponse({ description: 'Success' })
  async login(@Body() dto: AuthCredentialDto) {
    return this.authService.login(dto);
  }
}
