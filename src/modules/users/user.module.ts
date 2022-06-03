import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaslModule } from '../casl/casl.module';
import { MailModule } from '../mail/mail.module';
import { UsersController } from './user.controller';
import { User } from './user.entity';
import { UsersService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CaslModule, MailModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [],
})
export class UserModule {}
