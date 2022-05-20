import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersRepository {
  async findByConditions(conditions: any) {
    const user = await User.find(conditions);
    if (!user) {
      return null;
    }
    return user;
  }
}
