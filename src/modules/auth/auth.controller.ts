import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { customDecorators } from 'src/common/custom-decorators/custom-response.decorator';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { SignUpDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
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
}
