import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsEnum, IsNumber, IsString, IsArray, IsUrl, IsOptional } from 'class-validator';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
    @Prop({ required: true })
    @IsNumber()
    product_reference: number;
    
    @Prop({ required: true })
    @IsString()
    product_name: string;
    
    @Prop({ required: true })
    @IsString()
    product_description: string;
    
    @Prop({ required: true })
    @IsNumber({ maxDecimalPlaces: 2 })
    product_price: number;
    
    @Prop({ required: true })
    @IsNumber()
    product_quantity: number;
    
    @Prop({ required: true, enum: ['SNES', 'NES', 'GENESIS', 'MASTER', 'PSX', 'N64', 'PS2', 'GBA'] })
    @IsEnum(['SNES', 'NES', 'GENESIS', 'MASTER', 'PSX', 'N64', 'PS2', 'GBA'])
    product_platform: string;
    
    @Prop({ required: true, enum: ['CONSOLE', 'GAME', 'ACCESSORIES'] })
    @IsEnum(['CONSOLE', 'GAME', 'ACCESSORIES'])
    product_type: string;
    
    @Prop({ required: true, type: [String] })
    @IsArray()
    @IsUrl({}, { each: true })
    product_img: string[];
    
    @Prop()
    @IsOptional()
    @IsUrl()
    product_video: string;
    
    @Prop({ required: true, enum: ['NEW', 'SALES', 'NORMAL'] })
    @IsEnum(['NEW', 'SALES', 'NORMAL'])
    product_status: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
