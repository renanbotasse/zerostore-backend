import { IsEnum, IsNumber, IsString, IsArray, IsUrl } from 'class-validator';

export enum ProductPlatform {
  SNES = 'SNES',
  NES = 'NES',
  GENESIS = 'GENESIS',
  MASTER = 'MASTER',
  PSX = 'PSX',
  N64 = 'N64',
  PS2 = 'PS2',
  GBA = 'GBA',
}

export enum ProductType {
  CONSOLE = 'CONSOLE',
  GAME = 'GAME',
  ACCESSORIES = 'ACCESSORIES',
}

export enum ProductStatus {
  NEW = 'NEW',
  SALES = 'SALES',
  NORMAL = 'NORMAL',
}

export class Product {
  @IsNumber()
  product_reference: number;

  @IsString()
  product_name: string;

  @IsString()
  product_description: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  product_price: number;

  @IsNumber()
  product_quantity: number;

  @IsEnum(ProductPlatform)
  product_platform: ProductPlatform;

  @IsEnum(ProductType)
  product_type: ProductType;

  @IsArray()
  @IsUrl({}, { each: true })
  product_img: string[];

  @IsUrl()
  product_video: string;

  @IsEnum(ProductStatus)
  product_status: ProductStatus;

  constructor(
    product_reference: number,
    product_name: string,
    product_description: string,
    product_price: number,
    product_quantity: number,
    product_platform: ProductPlatform,
    product_type: ProductType,
    product_img: string[],
    product_video: string,
    product_status: ProductStatus,
  ) {
    this.product_reference = product_reference;
    this.product_name = product_name;
    this.product_description = product_description;
    this.product_price = product_price;
    this.product_quantity = product_quantity;
    this.product_platform = product_platform;
    this.product_type = product_type;
    this.product_img = product_img;
    this.product_video = product_video;
    this.product_status = product_status;
  }
}
