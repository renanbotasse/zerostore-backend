import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UserAddressEntity } from '../../../domain/entities/user.address.entity';

export class CreateUserDto {
  @ApiProperty({ example: 'password', description: 'User password' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: 'John Doe', description: 'User full name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'User email address',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '12345', description: 'User fiscal number' })
  @IsNotEmpty()
  @IsString()
  fiscalNumber: string;

  @ApiProperty({ type: UserAddressEntity, description: 'User address' })
  @ValidateNested()
  @Type(() => UserAddressEntity)
  address: UserAddressEntity;
}
