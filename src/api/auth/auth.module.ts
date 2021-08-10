import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AppLogModule } from '@shared/app-log';
import { UserRepository, UserService } from '@api/user';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from '@api/auth/strategy';

@Module({
  imports: [
    AppLogModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  providers: [AuthService, UserService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, PassportModule],
})
export class AuthModule {}
