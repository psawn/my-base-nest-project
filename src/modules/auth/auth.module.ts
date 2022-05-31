import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from 'src/shared/services/config.service';
import { CaslModule } from '../casl/casl.module';
import { User } from '../users/user.entity';
import { UsersService } from '../users/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

const configService = new ConfigService();

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: configService.jwt.accessJWTSecret,
      signOptions: {
        expiresIn: configService.jwt.accessJWTExpire,
      },
    }),
    CaslModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    ConfigService,
    UsersService,
    GoogleStrategy,
  ],
  exports: [],
})
export class AuthModule {}
