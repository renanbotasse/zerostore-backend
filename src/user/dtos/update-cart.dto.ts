
import { IsArray, ValidateNested, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CartEntityDto {
  @IsInt()
  product_ref: number;

  @IsInt()
  quantity: number;

}

export class UpdateCartDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CartEntityDto)
  cart: CartEntityDto[];
}
