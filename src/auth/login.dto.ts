import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'email', description: 'email' })
  @IsString()
  email: string;

  @ApiProperty({ example: 'password', description: 'password' })
  @IsString()
  password: string;
}
