import { Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/auth.dto';
import { UsersRepository } from '../users/user.repository';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async signUp(signUpDto: SignUpDto) {
    return await this.usersRepository.signUp(signUpDto);
  }
}
