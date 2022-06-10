import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  SignInDto,
  SignUpDto,
  ResetPasswordDto,
  ForgetPasswordDto,
  RefreshTokenDto,
} from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from 'src/shared/services/config.service';
import { UsersService } from '../users/user.service';
import { generate } from 'rand-token';
import { hashPassword } from 'src/helpers/encrypt.helper';
import { MailService } from '../mail/mail.service';
import { MailSubjectConstants } from 'src/common/constants/config.constant';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
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
      return 'No user from facebook';
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
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.jwt.refreshJWTSecret,
      expiresIn: this.configService.jwt.refreshJWTExpire,
    });

    return { accessToken, refreshToken };
  }

  async forgotPassword(forgetPasswordDto: ForgetPasswordDto) {
    const { email } = forgetPasswordDto;
    const user = await this.usersService.findByConditions({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const randomToken = generate(50);
    user.token = randomToken;
    await user.save();

    const token = await this.jwtService.signAsync(
      {
        randomToken,
      },
      {
        secret: this.configService.jwt.accessJWTSecret,
        expiresIn: this.configService.jwt.accessJWTExpire,
      },
    );

    const data = {
      to: email,
      subject: MailSubjectConstants.FORGOT_PASSWORDS,
      html: `<h3>Click <a href="/reset-password?token=${token}">here</a> to set new password</h3>`,
    };
    await this.mailService.createMailAndSend(data);

    // return token;
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { token, password } = resetPasswordDto;
    let decoded = null;

    try {
      decoded = await this.jwtService.verifyAsync(token, {
        secret: this.configService.jwt.accessJWTSecret,
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }

    const user = await this.usersService.findByConditions({
      where: {
        token: decoded.randomToken,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Not found token');
    }

    const { iat, exp } = decoded;
    const currentTime = new Date().getTime() / 1000;

    if (currentTime < iat || currentTime > exp) {
      throw new UnauthorizedException('Expired token');
    }

    user.password = await hashPassword(password);
    user.token = null;
    await user.save();
  }

  async checkRefreshToken(refreshTokenDto: RefreshTokenDto) {
    const { refreshToken } = refreshTokenDto;
    let decoded = null;

    try {
      decoded = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.jwt.refreshJWTSecret,
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }

    if (!decoded) {
      throw new UnauthorizedException('Invalid token');
    }

    const user = await this.usersService.findByConditions({
      where: {
        email: decoded.email,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const tokens = await this.generateToken(user);
    return tokens.accessToken;
  }
}
