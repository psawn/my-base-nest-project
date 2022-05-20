import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { PageLimitDto } from 'src/common/dto/page-limit.dto';

export class FilterUsersDto extends PageLimitDto {
  @IsOptional()
  @ApiProperty({
    description: 'Email',
    example: 'test@gmail.com',
  })
  email?: string;
}
