import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// export const JwtAuthGuard = AuthGuard('jwt');
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: any, status?: any) {
    if (info instanceof Error) {
      throw new UnauthorizedException(info.message);
    }

    return super.handleRequest(err, user, info, context, status);
  }
}
