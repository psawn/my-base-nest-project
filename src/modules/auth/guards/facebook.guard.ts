import { AuthGuard } from '@nestjs/passport';

export class AuthFacebook extends AuthGuard('facebook') {
  constructor() {
    super({
      display: 'popup',
      scope: ['email'],
    });
  }
}
