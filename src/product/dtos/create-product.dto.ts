import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString, IsArray, IsUrl } from 'class-validator';
import {
  ProductPlatform,
  ProductType,
  ProductStatus,
} from '../product.entity';

export class CreateProductDto {
  @ApiProperty({ example: 123456 })
  @IsNumber()
  product_reference: number;

  @ApiProperty({ example: 'Product Name' })
  @IsString()
  product_name: string;

  @ApiProperty({ example: 'Product Description' })
  @IsString()
  product_description: string;

  @ApiProperty({ example: 100 })
  @IsNumber({ maxDecimalPlaces: 2 })
  product_price: number;

  @ApiProperty({ example: 10 })
  @IsNumber()
  product_quantity: number;

  @ApiProperty({ example: 'SNES', enum: ProductPlatform })
  @IsEnum(ProductPlatform)
  product_platform: ProductPlatform;

  @ApiProperty({ example: 'CONSOLE', enum: ProductType })
  @IsEnum(ProductType)
  product_type: ProductType;

  @ApiProperty({
    type: [String],
    example: [
      'https://example.com/img1.jpg',
      'https://example.com/img2.jpg',
      'https://example.com/img3.jpg',
      'https://example.com/img4.jpg',
    ],
  })
  @IsArray()
  @IsUrl({}, { each: true })
  product_img: string[];

  @ApiProperty({ example: 'https://example.com/video.mp4' })
  @IsUrl()
  product_video: string;

  @ApiProperty({ example: 'NEW', enum: ProductStatus })
  @IsEnum(ProductStatus)
  product_status: ProductStatus;
}
