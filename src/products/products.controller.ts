import { Controller, Query, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductsService,  } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createProductDto: CreateProductDto) {
    console.log(createProductDto);
    return this.productsService.createProduct(createProductDto);
  }

  @Get()
  getProducts(@Query() queryParams: any) {
    return this.productsService.getProducts(queryParams);
  }
  

  @Get('new')
  getNewProducts() {
    return this.productsService.getNewProducts();
  }

  @Get('console')
  getCategoryConsole() {
    return this.productsService.getCategoryConsole();
  }

  @Get('game')
  getCategoryGame() {
    return this.productsService.getCategoryGame();
  }

  @Get('accessories')
  getCategoryAccessories() {
    return this.productsService.getCategoryAccessories();
  }

  @Get('sales')
  getSalesProducts() {
    return this.productsService.getSalesProducts();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
