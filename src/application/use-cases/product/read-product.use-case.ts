// update-product.use-case.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductMongoDBEntity } from '../../../infrastructure/mongodb/entities/product.mongodb-entity';

@Injectable()
export class UseProductRead {
  constructor(
    @InjectModel(ProductMongoDBEntity.name)
    private productModel: Model<ProductMongoDBEntity>,
  ) {}

  async getProductSearch(queryParams: any): Promise<ProductMongoDBEntity[]> {
    const query: any = {};

    if (queryParams.product_name) {
      query.product_name = {
        $regex: new RegExp(queryParams.product_name, 'i'),
      };
    }

    return this.productModel.find(query).exec();
  }

  async getProducts(): Promise<ProductMongoDBEntity[]> {
    return this.productModel.find().exec();
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
}