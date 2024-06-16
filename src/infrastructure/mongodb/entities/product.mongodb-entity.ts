import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  ProductPlatform,
  ProductType,
  ProductStatus,
} from '../../../domain/entities/product.entity';

@Schema()
export class ProductMongoDBEntity extends Document {
  @Prop({ required: true })
  product_reference: number;

  @Prop({ required: true })
  product_name: string;

  @Prop({ required: true })
  product_description: string;

  @Prop({ required: true })
  product_price: number;

  @Prop({ required: true })
  product_quantity: number;

  @Prop({ required: true, enum: ProductPlatform })
  product_platform: ProductPlatform;

  @Prop({ required: true, enum: ProductType })
  product_type: ProductType;

  @Prop({ required: true, type: [String] })
  product_img: string[];

  @Prop({ required: true })
  product_video: string;

  @Prop({ required: true, enum: ProductStatus })
  product_status: ProductStatus;
}

export const ProductMongoDBEntitySchema =
  SchemaFactory.createForClass(ProductMongoDBEntity);
