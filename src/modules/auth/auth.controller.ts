import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { customDecorators } from 'src/common/custom-decorators/custom-response.decorator';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { SignInDto, SignUpDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthGoogle } from './guards/google.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @HttpCode(200)
  @ApiResponse({
    status: 201,
    description: 'Create user successfully.',
  })
  @customDecorators()
  async signUp(@Body(ValidationPipe) signUpDto: SignUpDto) {
    await this.authService.signUp(signUpDto);
    return {
      message: 'Create user successfully.',
    };
  }

  @Post('/signin')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Login successfully.',
  })
  @customDecorators()
  async signIn(@Body(ValidationPipe) signInDto: SignInDto) {
    const data = await this.authService.signIn(signInDto);
    return {
      message: 'Login successfully.',
      data,
    };
  }

  @Get('/google')
  @UseGuards(AuthGoogle)
  async googleAuth() {
    return;
  }

  @Get('/google/callback')
  @UseGuards(AuthGoogle)
  async googleAuthRedirect(@Req() req: any) {
    const data = await this.authService.googleLogin(req);
    return {
      message: 'Login successfully.',
      data,
    };
  }
}
