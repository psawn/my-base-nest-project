import { Injectable } from '@nestjs/common';
import { TypeORMRepository } from 'src/common/typeorm.repository';
import { FilterUsersDto } from './dto/user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersRepository extends TypeORMRepository<User> {
  async findByConditions(filterUsersDto: FilterUsersDto) {
    const { page, limit, email } = filterUsersDto;
    const query = User.createQueryBuilder('users');

    query.select([
      'users.id',
      'users.email',
      'users.phone',
      'users.created_at',
      'users.updated_at',
      'users.deleted_at',
    ]);

    if (email) {
      query.andWhere('users.email = :email', { email });
    }

    return this.paginate({ page, limit }, query);
  }
}
