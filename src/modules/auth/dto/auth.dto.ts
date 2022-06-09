import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'Email',
    example: 'test@gmail.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Password',
    example: 'test@gmail.com',
  })
  password: string;

  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty({
    description: 'Phone',
    example: '0972055909',
  })
  phone: string;
}

export class SignInDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'Email',
    example: 'test@gmail.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Password',
    example: 'test@gmail.com',
  })
  password: string;
}

export class ForgetPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'Email',
    example: 'test@gmail.com',
  })
  email: string;
}

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Token',
    example: 'eyJhbGciOiJI...',
  })
  token: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Password',
    example: '123456',
  })
  password: string;
}
