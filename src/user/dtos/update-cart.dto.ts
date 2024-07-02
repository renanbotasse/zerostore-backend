
import { IsArray, ValidateNested, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CartEntityDto {
  @ApiProperty({ example: 'product_reference', description: 'Product Reference' })
  @IsInt()
  product_reference: number;

  @ApiProperty({ example: 'quantity', description: 'Quantity' })
  @IsInt()
  quantity: number;

}

export class UpdateCartDto {
  @ApiProperty({ example: '[{product_reference: , quantity: }]' , description: 'Array of objects with product_reference and quantity' })
  
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CartEntityDto)
  cart: CartEntityDto[];
}
