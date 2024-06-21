import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteUserDto {
  @ApiProperty({ example: 1, description: 'User ID to delete' })
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
