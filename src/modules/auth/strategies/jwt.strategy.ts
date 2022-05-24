import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/modules/users/user.service';
import { ConfigService } from 'src/shared/services/config.service';
import { omit } from 'lodash';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.jwt.accessJWTSecret,
    });
  }

  // tự dộng add user vào request nếu có jwt payload, sử dụng = request.user -> chưa hiểu cách hoạt động
  async validate(payload: any) {
    const user = await this.usersService.findOneByConditions({
      where: {
        id: payload.id,
        email: payload.email,
      },
    });
    const { password, ...result } = user;
    return result;
    // return omit(user, ['password']);
  }
}
