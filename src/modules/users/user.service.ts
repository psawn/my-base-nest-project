import { Injectable } from '@nestjs/common';
import { UsersRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findByConditions(conditions: any) {
    const user = await this.usersRepository.findByConditions(conditions);
    if (!user) {
      return null;
    }
    return user;
  }
}
