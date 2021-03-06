import {
  Body,
  Controller,
  Get,
  Patch,
  Query,
  Req,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/custom-decorators/auth.decorator';
// import { Auth } from 'src/common/custom-decorators/auth.decorator';
import { customDecorators } from 'src/common/custom-decorators/custom-response.decorator';
import { Roles } from 'src/common/custom-decorators/role.decorator';
import { FilterUsersDto, UpdateUserDto } from './dto/user.dto';
import { UsersService } from './user.service';

@Auth()
@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles('admin')
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

  @Patch()
  @ApiResponse({
    status: 200,
    description: 'Update user successfully.',
  })
  @customDecorators()
  async update(
    @Req() request: any,
    // set whitelist = true sẽ loại bỏ các property không được định nghĩa
    @Body(new ValidationPipe({ whitelist: true })) updateUserDto: UpdateUserDto,
  ) {
    const data = await this.usersService.update(request, updateUserDto);
    return {
      message: 'Update user successfully.',
      data: data,
    };
  }
}
