import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaslModule } from '../casl/casl.module';
import { UsersController } from './user.controller';
import { User } from './user.entity';
import { UsersService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CaslModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [],
})
export class UserModule {}
