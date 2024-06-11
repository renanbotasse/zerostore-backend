import { IsNotEmpty, IsEnum, IsNumber, IsString, IsArray, IsUrl, IsOptional } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    @IsNumber()
    product_reference: number;
    
    @IsNotEmpty()
    @IsString()
    product_name: string;
    
    @IsNotEmpty()
    @IsString()
    product_description: string;
    
    @IsNotEmpty()
    @IsNumber({ maxDecimalPlaces: 2 })
    product_price: number;
    
    @IsNotEmpty()
    @IsNumber()
    product_quantity: number;
    
    @IsNotEmpty()
    @IsEnum(['SNES', 'NES', 'GENESIS', 'MASTER', 'PSX', 'N64', 'PS2', 'GBA'])
    product_platform: string;
    
    @IsNotEmpty()
    @IsEnum(['CONSOLE', 'GAME', 'ACCESSORIES'])
    product_type: string;
    
    @IsNotEmpty()
    @IsArray()
    @IsUrl({}, { each: true })
    product_img: string[];
    
    @IsNotEmpty()
    @IsUrl()
    product_video: string;
    
    @IsNotEmpty()
    @IsEnum(['NEW', 'SALES', 'NORMAL'])
    product_status: string;
}
