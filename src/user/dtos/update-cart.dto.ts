// update-cart.dto.ts
import { IsArray, ValidateNested, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CartEntityDto {
  @IsInt()
  productReference: number; // Use the correct property name

  @IsInt()
  quantity: number;
}

export class UpdateCartDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CartEntityDto)
  cart: CartEntityDto[];
}
