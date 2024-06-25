import { IsInt } from 'class-validator';

export class CartEntity {
  @IsInt()
  product_reference: number; // Use the correct property name

  @IsInt()
  quantity: number;
}


