import { Controller, Get } from '@nestjs/common';
import { UsersService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async get() {
    const user = await this.usersService.findByConditions(null);
    return {
      data: user,
    };
  }
}
