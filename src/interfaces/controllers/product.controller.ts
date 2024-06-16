import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Query,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from '../../domain/services/product.service';
import { CreateProductDto } from '../../application/dto/product/create-product.dto';
import { UpdateProductDto } from '../../application/dto/product/update-product.dto';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Get()
  getProducts() {
    return this.productService.getProducts();
  }

  @Get('search')
  async getSearchProducts(@Query() queryParams: any) {
    return await this.productService.getProductSearch(queryParams);
  }

  @Get('new')
  getNewProducts() {
    return this.productService.getProductNew();
  }

  @Get('game')
  getCategoryGame() {
    return this.productService.getProductCategoryGame();
  }

  @Get('accessories')
  getCategoryAccessories() {
    return this.productService.getProductCategoryAccessories();
  }

  @Get('sales')
  getSalesProducts() {
    return this.productService.getProductSales();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.updateProduct(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.deleteProduct(+id);
  }
}
