import { BadRequestException, Injectable } from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from 'src/shared/services/config.service';
import { UsersService } from '../users/user.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    return await this.usersService.signUp(signUpDto);
  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;
    const user = await this.usersService.findByConditions({
      where: {
        email: email,
      },
    });

    if (user && (await user.validatePassword(password))) {
      return await this.generateToken(user);
    }

    throw new BadRequestException('Invalid credentials');
  }

  async googleLogin(req: any) {
    if (!req.user) {
      return 'No user from google';
    }

    const { email, googleId } = req.user;

    let user = await this.usersService.findByConditions({
      where: {
        email: email,
      },
    });

    if (!user) {
      const data = {
        email: email,
        googleId: googleId,
      };
      user = await this.usersService.generateUser(data);
    }

    if (!user.googleId) {
      user.googleId = googleId;
      await user.save();
    }

    return await this.generateToken(user);
  }

  async facebookLogin(req: any) {
    if (!req.user) {
      return 'No user from google';
    }

    const { email, id } = req.user;

    let user = await this.usersService.findByConditions({
      where: {
        email: email,
      },
    });

    if (!user) {
      const data = {
        email: email,
        facebookId: id,
      };
      user = await this.usersService.generateUser(data);
    }

    if (!user.facebookId) {
      user.facebookId = id;
      await user.save();
    }

    return await this.generateToken(user);
  }

  async generateToken(user: any) {
    const payload = {
      id: user.id,
      email: user.email,
    };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.jwt.accessJWTSecret,
      expiresIn: this.configService.jwt.accessJWTExpire,
    });
    const refreshToken = await this.jwtService.signAsync(
      { id: user.id },
      {
        secret: this.configService.jwt.accessJWTSecret,
        expiresIn: this.configService.jwt.accessJWTExpire,
      },
    );

    return { accessToken, refreshToken };
  }
}
