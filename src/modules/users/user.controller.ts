import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { customDecorators } from 'src/common/custom-decorators/custom-response.decorator';
import { FilterUsersDto } from './dto/user.dto';
import { UsersService } from './user.service';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get users successfully.',
  })
  @customDecorators()
  async get(@Query(ValidationPipe) filterUsersDto: FilterUsersDto) {
    const user = await this.usersService.findByConditions(filterUsersDto);
    return {
      data: user,
    };
  }
}
