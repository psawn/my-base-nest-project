import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-facebook';
import { Injectable } from '@nestjs/common';
import { ConfigService } from 'src/shared/services/config.service';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.fb.facebookId,
      clientSecret: configService.fb.facebookSecret,
      callbackURL: 'http://localhost:3000/api/auth/facebook/callback',
      passReqToCallback: true,
      profileFields: ['id', 'emails', 'name'],
      scope: 'email',
    });
  }

  async validate(
    req: any,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user?: any, info?: any) => void,
  ): Promise<any> {
    const { id, name, emails } = profile;
    const user = {
      id,
      name,
      email: emails[0].value,
      accessToken,
    };
    done(null, user);
  }
}
