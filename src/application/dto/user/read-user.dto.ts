// src/application/dto/user/read-user.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class ReadUserDto {
  @ApiProperty({ example: 1, required: false, description: 'User ID' })
  @IsOptional()
  @IsNumber()
  userId?: number;

  @ApiProperty({
    example: 'john.doe@example.com',
    required: false,
    description: 'User email',
  })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({
    example: 'customer',
    required: false,
    description: 'User role',
  })
  @IsOptional()
  @IsNumber()
  typeUser?: number;
}
