import { IsNumberString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PageLimitDto {
  @IsOptional()
  @IsNumberString()
  @ApiProperty({
    description: 'page.',
    example: '1',
  })
  page?: number;

  @IsOptional()
  @IsNumberString()
  @ApiProperty({
    description: 'items per page.',
    example: '10',
  })
  limit?: number;
}
