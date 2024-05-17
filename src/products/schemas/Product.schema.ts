import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Product {
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
    product_img: [string];
    @Prop()
    product_new: boolean;
    @Prop()
    product_sales: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product)