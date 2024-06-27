import { IsInt } from 'class-validator';

export class CartEntity {
  @IsInt()
  product_reference: number; 

  @IsInt()
  quantity: number;
}


