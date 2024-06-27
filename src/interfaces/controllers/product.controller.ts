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
import { CreateProductDto } from '../../application/dto/product/create-product.dto';
import { UpdateProductDto } from '../../application/dto/product/update-product.dto';
import { UseProductCreate } from '../../application/use-cases/product/create-product.use-case';
import { UseProductDelete } from '../../application/use-cases/product/delete-product.use-case';
import { UseProductUpdate } from '../../application/use-cases/product/update-product.use-case';
import { UseProductRead } from '../../application/use-cases/product/read-product.use-case';
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

  @Roles(UserType.Admin)
  @Post()
  @UsePipes(new ValidationPipe())
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.createProductUse.createProduct(createProductDto);
  }


  @Get()
  getProducts() {
    return this.readProductUse.getProducts();
  }


  @Get('search')
  async getSearchProducts(@Query() queryParams: any) {
    return await this.readProductUse.getProductSearch(queryParams);
  }


  @Get(':product_reference')
  async getProductById(@Param('product_reference') product_reference: number): Promise<ProductMongoDBEntity> {
    const product = await this.readProductUse.getProductsById(product_reference);
    if (!product) {
      throw new NotFoundException(`Product with reference ${product_reference} not found`);
    }
    return product;
  }


  @Get('new')
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

  @Roles(UserType.Admin, UserType.User)
  @Get('sales')
  getSalesProducts() {
    return this.readProductUse.getProductSales();
  }

  @Roles(UserType.Admin)
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

  @Roles(UserType.Admin)
  @Delete(':product_reference')
  remove(@Param('product_reference') product_reference: number) {
    return this.deleteProductUse.deleteProduct(product_reference);
  }
}
