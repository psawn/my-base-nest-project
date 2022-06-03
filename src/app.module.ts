import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './database/typeorm.config';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/guards/auth.guard';
import { RolesGuard } from './modules/auth/guards/roles.guard';
import { UserModule } from './modules/users/user.module';
import { SharedModule } from './shared/shared.module';
import { CaslModule } from './modules/casl/casl.module';
import { MailModule } from './modules/mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    SharedModule,
    UserModule,
    AuthModule,
    CaslModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // JwtAuthGuard và RolesGuard trở thành global scope, phải theo đúng thứ tự JwtAuthGuard->RolesGuard (C2)
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ],
})
export class AppModule {}
