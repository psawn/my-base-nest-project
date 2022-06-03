import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import { Injectable } from '@nestjs/common';
import { ConfigService } from 'src/shared/services/config.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.gg.googleId,
      clientSecret: configService.gg.googleSecret,
      callbackURL: 'http://localhost:3000/api/auth/google/callback',
      passReqToCallback: true,
      scope: ['email', 'profile'],
      // set accessType = offfline để lấy refresh Token
      // accessType: 'offline',
    });
  }

  async validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { email, id } = profile;
    const user = {
      email,
      googleId: id,
      accessToken,
    };
    return user;
  }
}
