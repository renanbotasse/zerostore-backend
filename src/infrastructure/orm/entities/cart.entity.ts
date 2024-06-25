import { IsInt } from 'class-validator';

export class CartEntity {
  @IsInt()
  productReference: number; // Use the correct property name

  @IsInt()
  quantity: number;
}


