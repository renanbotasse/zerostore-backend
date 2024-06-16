import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from '../../application/dto/product/create-product.dto';
import { UpdateProductDto } from '../../application/dto/product/update-product.dto';
import { ProductMongoDBEntity } from '../../infrastructure/mongodb/entities/product.mongodb-entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(ProductMongoDBEntity.name)
    private productModel: Model<ProductMongoDBEntity>,
  ) {}

  async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<ProductMongoDBEntity> {
    const newProduct = new this.productModel(createProductDto);
    return newProduct.save();
  }

  async getProductSearch(queryParams: any): Promise<ProductMongoDBEntity[]> {
    const query: any = {};

    if (queryParams.product_name) {
      query.product_name = {
        $regex: new RegExp(queryParams.product_name, 'i'),
      };
    }

    return this.productModel.find(query).exec();
  }

  async getProducts(queryParams: any): Promise<ProductMongoDBEntity[]> {
    const query: any = {};

    if (queryParams.product_type) {
      query.product_type = { $regex: queryParams.product_type, $options: 'i' };
    }

    if (queryParams.product_new) {
      query.product_status = 'NEW';
    }

    if (queryParams.product_sales) {
      query.product_status = 'SALES';
    }

    if (queryParams.product_platform) {
      query.product_platform = {
        $regex: queryParams.product_platform,
        $options: 'i',
      };
    }

    return this.productModel.find(query).exec();
  }

  async getProductCategoryGame(): Promise<ProductMongoDBEntity[]> {
    return this.productModel.find({ product_type: 'GAME' }).exec();
  }

  async getProductCategoryAccessories(): Promise<ProductMongoDBEntity[]> {
    return this.productModel.find({ product_type: 'ACCESSORIES' }).exec();
  }

  async getProductNew(): Promise<ProductMongoDBEntity[]> {
    return this.productModel.find({ product_status: 'NEW' }).exec();
  }

  async getProductSales(): Promise<ProductMongoDBEntity[]> {
    return this.productModel.find({ product_status: 'SALES' }).exec();
  }

  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductMongoDBEntity> {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();
    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return updatedProduct;
  }

  async deleteProduct(id: number): Promise<void> {
    const result = await this.productModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }
}
