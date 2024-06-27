import { IsArray, IsInt, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CheckoutDto {
  @IsInt()
  product_reference: number;

  @IsInt()
  quantity: number;
}

export class CreateCheckoutDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CheckoutDto)
  cart: CheckoutDto[];
}