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
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { UseProductCreate } from './use-cases/create-product.use-case';
import { UseProductDelete } from './use-cases/delete-product.use-case';
import { UseProductUpdate } from './use-cases/update-product.use-case';
import { UseProductRead } from './use-cases/read-product.use-case';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { ProductMongoDBEntity } from 'src/infrastructure/mongodb/entities/product.mongodb-entity';

@Controller('products')
export class ProductController {
  constructor(
    private createProductUse: UseProductCreate,
    private updateProductUse: UseProductUpdate,
    private deleteProductUse: UseProductDelete,
    private readProductUse: UseProductRead,
  ) {}


  @Post()
  @UsePipes(new ValidationPipe())
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.createProductUse.createProduct(createProductDto);
  }

  @Get()
  getProducts() {
    return this.readProductUse.getProducts();
  }

  @Patch(':product_reference')
  update(
    @Param('product_reference') product_reference: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.updateProductUse.updateProduct(
      product_reference,
      updateProductDto,
    );
  }

  @Get('search')
  async getSearchProducts(@Query() queryParams: any) {
    return await this.readProductUse.getProductSearch(queryParams);
  }

  @Get('/:product_reference')
  async getProductById(@Param('product_reference') product_reference: number): Promise<ProductMongoDBEntity> {
    const product = await this.readProductUse.getProductsById(product_reference);
    if (!product) {
      throw new NotFoundException(`Product with reference ${product_reference} not found`);
    }
    return product;
  }

  @Get('/status/new')
  getNewProducts() {
    return this.readProductUse.getProductNew();
  }

  @Get('game')
  getCategoryGame() {
    return this.readProductUse.getProductCategoryGame();
  }

  @Get('accessories')
  getCategoryAccessories() {
    return this.readProductUse.getProductCategoryAccessories();
  }

  @Get('/status/sales')
  getSalesProducts() {
    return this.readProductUse.getProductSales();
  }


}
