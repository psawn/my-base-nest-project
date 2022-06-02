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
      scope: ['email', 'profile'],
      // prompt không hoạt động -> phải tạo 1 class AuthGoogle extend AuthGuard('google') (chưa hiểu)
      prompt: 'select_account',
      // set accessType = offfline để lấy refresh Token
      // accessType: 'offline',
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { email, id } = profile;
    const user = {
      email: email,
      googleId: id,
      accessToken,
    };
    done(null, user);
  }
}
