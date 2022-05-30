import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashPassword } from 'src/helpers/encrypt.helper';
import { paginateData } from 'src/helpers/pagination.helper';
import { Repository } from 'typeorm';
import { SignUpDto } from '../auth/dto/auth.dto';
import { FilterUsersDto, UpdateUserDto } from './dto/user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    // cách viết k tạo file repository
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAll(filterUsersDto: FilterUsersDto) {
    const { page, limit, email } = filterUsersDto;
    const query = this.userRepository.createQueryBuilder('users');

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

    return await paginateData({ page, limit }, query);
  }

  async findByConditions(conditions: any) {
    return await this.userRepository.findOne(conditions);
  }

  async update(request: any, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        id: request.user.id,
      },
    });
    const data = { ...updateUserDto, id: user.id };
    return await this.userRepository.save(data);
  }

  async signUp(signUpDto: SignUpDto) {
    const { email } = signUpDto;
    const existUser = await this.userRepository.findOne({
      where: { email: email },
    });

    if (existUser) {
      throw new BadRequestException('Email already exists');
    }

    signUpDto.password = await hashPassword(signUpDto.password);
    return await this.userRepository.save(signUpDto);
  }

  async softDelete(id: string) {
    const existUser = await this.findByConditions({
      where: { id: id },
    });

    if (!existUser) {
      throw new BadRequestException();
    }

    await this.userRepository.softDelete({ id });
  }
}
