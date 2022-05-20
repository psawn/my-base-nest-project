import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { FilterUsersDto } from './dto/user.dto';
import { UsersService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async get(@Query(ValidationPipe) filterUsersDto: FilterUsersDto) {
    const user = await this.usersService.findByConditions(filterUsersDto);
    return {
      data: user,
    };
  }
}
