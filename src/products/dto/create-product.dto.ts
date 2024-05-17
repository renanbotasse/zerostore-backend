import { IsNotEmpty } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    product_id: number;
    
    @IsNotEmpty()
    product_name: string;
    
    @IsNotEmpty()
    product_description: string;
    
    @IsNotEmpty()
    product_price: number;
    
    @IsNotEmpty()
    product_available: number;
    
    @IsNotEmpty()
    product_platform: string;
    
    @IsNotEmpty()
    product_type: string;
    
    @IsNotEmpty()
    product_img: [string];
    
    @IsNotEmpty()
    product_new: boolean;
    
    @IsNotEmpty()
    product_sales: boolean;
}
