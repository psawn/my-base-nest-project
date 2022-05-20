import { Injectable } from '@nestjs/common';
import { FilterUsersDto } from './dto/user.dto';
import { UsersRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findByConditions(filterUsersDto: FilterUsersDto) {
    return await this.usersRepository.findByConditions(filterUsersDto);
  }
}
