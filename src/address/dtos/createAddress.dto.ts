import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  street: string;

  @IsNumber()
  numberAddress: number;

  @IsString()
  @IsOptional()
  complement: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  country: string;

  @IsString()
  zipCode: string;
}
