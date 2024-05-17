/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<Product>;

@Schema()
export class Product {
    @Prop()
    _id: string;

    @Prop()
    product_id: number;

    @Prop()
    product_name: string;

    @Prop()
    product_description: string;

    @Prop()
    product_price: number;

    @Prop()
    product_available: number;

    @Prop()
    product_platform: string;

    @Prop()
    product_type: string;

    @Prop()
    product_img: string[];

    @Prop()
    product_new: boolean;

    @Prop()
    product_sales: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
