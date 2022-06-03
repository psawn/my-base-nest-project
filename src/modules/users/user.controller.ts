import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Query,
  Req,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/custom-decorators/auth.decorator';
// import { Auth } from 'src/common/custom-decorators/auth.decorator';
import { customDecorators } from 'src/common/custom-decorators/custom-response.decorator';
import { CheckPolicies } from 'src/common/custom-decorators/policies.decorator';
import { Public } from 'src/common/custom-decorators/public.decorator';
import { Roles } from 'src/common/custom-decorators/role.decorator';
import {
  Action,
  AppAbility,
  CaslAbilityFactory,
} from '../casl/casl-ability.factory';
import { ReadAllPolicyHandler } from '../casl/ReadAllPolicyHandler';
import {
  ChangePasswordDto,
  FilterUsersDto,
  NewPasswordDto,
  UpdateUserDto,
} from './dto/user.dto';
import { User } from './user.entity';
import { UsersService } from './user.service';

@Auth()
@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @Get()
  @Roles('admin')
  // @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, User))
  @CheckPolicies(new ReadAllPolicyHandler())
  @ApiResponse({
    status: 200,
    description: 'Get users successfully.',
  })
  @customDecorators()
  async get(@Query(ValidationPipe) filterUsersDto: FilterUsersDto) {
    const user = await this.usersService.getAll(filterUsersDto);
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

  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Get user successfully.',
  })
  @customDecorators()
  async getById(@Param('id', ParseUUIDPipe) id: string, @Req() request: any) {
    // không thể sử dụng decorator -> phèn
    const user = new User();
    user.id = id;
    const ability = this.caslAbilityFactory.createForUser(request.user);

    if (ability.can(Action.Read, user) == false) {
      throw new ForbiddenException();
    }

    const data = await this.usersService.findByConditions({
      where: { id: id },
      select: ['id', 'email', 'phone', 'createdAt', 'updatedAt'],
    });

    return {
      message: 'Get user successfully.',
      data: data,
    };
  }

  @Roles('admin')
  @Delete('/:id')
  @ApiResponse({
    status: 200,
    description: 'Delete user successfully.',
  })
  @customDecorators()
  async softDelete(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() request: any,
  ) {
    const user = new User();
    user.id = id;
    const ability = this.caslAbilityFactory.createForUser(request.user);

    if (ability.cannot(Action.Delete, user) == false) {
      throw new BadRequestException();
    }

    await this.usersService.softDelete(id);
    return {
      message: 'Delete user successfully.',
    };
  }

  @Patch('/password')
  @ApiResponse({
    status: 200,
    description: 'Update password successfully.',
  })
  @customDecorators()
  async changePassword(
    @Req() request: any,
    @Body(new ValidationPipe({ whitelist: true }))
    changePasswordDto: ChangePasswordDto,
  ) {
    await this.usersService.updatePassword(request, changePasswordDto);
    return {
      message: 'Update user successfully.',
    };
  }

  @Patch('/setPassword')
  @ApiResponse({
    status: 200,
    description: 'Update password successfully.',
  })
  @customDecorators()
  async setPassword(
    @Req() request: any,
    @Body(new ValidationPipe({ whitelist: true }))
    newPasswordDto: NewPasswordDto,
  ) {
    await this.usersService.setPassword(request, newPasswordDto);
    return {
      message: 'Update user successfully.',
    };
  }
}
