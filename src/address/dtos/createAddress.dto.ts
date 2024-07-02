import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({ example: 'W. Back', description: 'Street' })
  @IsString()
  street: string;

  @ApiProperty({ example: '10A', description: 'Number' })
  @IsNumber()
  numberAddress: number;

  @ApiProperty({ example: 'House', description: 'Complement' })
  @IsString()
  @IsOptional()
  complement: string;

  @ApiProperty({ example: 'Boston', description: 'City' })
  @IsString()
  city: string;

  @ApiProperty({ example: 'MC', description: 'State' })
  @IsString()
  state: string;

  @ApiProperty({ example: 'USA', description: 'Country' })
  @IsString()
  country: string;

  @ApiProperty({ example: '0000-000', description: 'Zip-Code' })
  @IsString()
  zipCode: string;
}
