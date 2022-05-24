import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilterUsersDto, UpdateUserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UsersRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(
    // cách viết k tạo file repository
    // @InjectRepository(User)
    // private readonly userRepository: Repository<User>,
    private readonly usersRepository: UsersRepository,
  ) {}

  async findByConditions(filterUsersDto: FilterUsersDto) {
    const users = await this.usersRepository.findByConditions(filterUsersDto);

    if (!users) {
      throw new NotFoundException();
    }

    return users;
  }

  async findOneByConditions(conditions: any) {
    return await this.usersRepository.findOneByConditions(conditions);
  }

  async update(request: any, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOneByConditions({
      where: {
        id: request.user.id,
      },
    });
    const data = { ...updateUserDto, id: user.id };
    return await this.usersRepository.update(data);
  }
}
